const { body, param, query } = require("express-validator");
const RatingService = require("../services/ratings");
const LeadService = require("../services/leads");
const RouteService = require("../services/routes");
const Validations = require("../const/validatorSettings");
const { userLogger } = require("../core/logger");
const loggerActions = require("./../enums/loggerActions");
const { statusesOfRatings } = require("../config/statusSettings");
const { ApplicationError } = require("./../classes/Errors");
const fetch = require("node-fetch");

const hash = require("../core/hash");
require("dotenv").config();

module.exports.getRatingById = async (req) => {
  const { id } = req.params;
  const data = await RatingService.getRatingById(id);

  return { data };
};

module.exports.getRatingsWithParams = async (req) => {
  const result = await RatingService.getRatingsWithParams(req.query, req.query.type);

  return { data: result.data, count: result.count };
};

module.exports.createRating = async (req) => {
  const data = {
    ...req.body,
  };

  const result = await RatingService.createRating(data);

  userLogger(
    loggerActions.CREATE_RATING,
    {
      dataFromRequest: data,
      result: result,
    },
    req,
  );

  return {
    data: result,
  };
};

module.exports.updateRating = async (req) => {
  const { id } = req.params;

  const data = await RatingService.updateRating(
    {
      ...req.body,
    },
    { id },
  );

  userLogger(
    loggerActions.UPDATE_RATING,
    {
      dataFromRequest: { ...req.body, id },
      result: data,
    },
    req,
  );

  return {
    data: data,
  };
};

module.exports.sendRatingSmsForFinishedLead = async (req) => {
  const { leadId } = req.params;

  const leadInfo = await LeadService.getLeadById(leadId);
  const routeInfo = await RouteService.getRouteById(leadInfo.routeId);

  if (leadInfo.isSendedSmsRating === 1) {
    throw new ApplicationError("По данной заявке уже отправлена смска", {
      path: "controller",
    });
  }

  const sellerId = leadInfo?.address?.seller?.id;
  const sellerMobile = leadInfo?.address?.seller?.mobileNumber;
  const driverId = routeInfo?.driverId;

  if (!sellerId || !sellerMobile || !driverId) {
    throw new ApplicationError(
      "Отсутствует одно из полей [sellerId, sellerMobile, driverId]",
      {
        path: "controller",
      },
    );
  }

  const hashString = hash.encrypt64(
    JSON.stringify({
      d: driverId,
      l: leadId,
      s: sellerId,
    }),
  );

  const landingUrl = `${process.env.API_URL_SDL_RATING_LANDING}?h=${hashString}`;
  const text = `Пожалуйста, оцените нашу работу ${landingUrl}`;
  const smsSeviceUrl = `${process.env.API_URL_SMS_SERVICE}/api/v1/send/sms?mobile=${sellerMobile}&message=${text}`;

  if (!process.env.API_URL_SMS_SERVICE || !process.env.API_URL_SDL_RATING_LANDING) {
    throw new ApplicationError("Отсутствуют глобальные переменные]", {
      path: "controller",
    });
  }

  const response = await fetch(smsSeviceUrl, {
    method: "GET",
  });

  const result = await response.json();

  if (result?.error) {
    throw new ApplicationError(result?.error?.message || `Ошибка смс сервиса`, {
      path: "controller",
    });
  }

  await LeadService.update(
    {
      isSendedSmsRating: 1,
    },
    { id: leadId },
  );

  return {
    data: "sended",
  };
};

module.exports.addRatingFromPublic = async (req) => {
  const { service, hashString, value, comment } = req.body;

  if (service === "sdl") {
    // from seller to driver for lead
    const obj = JSON.parse(hash.decrypt64(hashString));

    const ratingObj = {
      fromEntityId: obj.s,
      fromEntityType: "seller",
      toEntityId: obj.d,
      toEntityType: "driver",
      actionForEntityId: obj.l,
      actionForEntityType: "lead",
    };

    const result = await RatingService.getRatingsWithParams(
      {
        fromEntityId: obj.s,
        fromEntityType: "seller",
        toEntityId: obj.d,
        toEntityType: "driver",
        actionForEntityId: obj.l,
        actionForEntityType: "lead",
      },
      service,
    );

    if (result.count > 0) {
      throw new ApplicationError("Ошибка, вы уже поставили оценку", {
        path: "controller",
      });
    }

    await RatingService.createRating({ ...ratingObj, value: value, comment });
  } else {
    throw new ApplicationError("Ошибка", {
      path: "controller",
    });
  }

  return {
    data: "added",
  };
};

module.exports.delete = async (req) => {
  const { id } = req.params;

  await RatingService.deleteRating({ id });

  userLogger(
    loggerActions.DELETE_RATING,
    {
      dataFromRequest: { id },
      result: { id },
    },
    req,
  );

  return {};
};

// module.exports.deleteRating = async (req, res) => {
//   try {
//     const { id } = req.params;

//     await RatingService.deleteRating({ id });

//     // userLogger(loggerActions.DELETE_RATING { id }, req);

//     return res.status(200).json({});
//   } catch (e) {
//     return res.status(400).json({ errors: [e.message] });
//   }
// };

const validationRatingFilterFields = [
  query("fromEntityId").isInt().optional(),
  query("fromEntityType").isString().optional(),
  query("toEntityId").isInt().optional(),
  query("toEntityType").isString().optional(),
  query("actionForEntityId").isInt().optional(),
  query("actionForEntityType").isString().optional(),
];

module.exports.validate = (method) => {
  switch (method) {
    case "getRatingById": {
      return [param("id").isInt()];
    }
    case "sdlById": {
      return [param("leadId").isInt()];
    }

    case "getRatingsWithParams": {
      return [
        ...validationRatingFilterFields,
        ...Validations.pagination,
        ...Validations.sorting,
      ];
    }

    case "createRating": {
      return [
        body("fromEntityId").isInt(),
        body("fromEntityType").isString(),
        body("toEntityId").isInt(),
        body("toEntityType").isString(),
        body("actionForEntityId").isInt(),
        body("actionForEntityType").isString(),
        body("comment").optional(),
        body("value").isInt({ min: 0, max: 50 }),
        body("status").isIn(statusesOfRatings).optional(),
        body("categoryOfRating").isInt().optional(),
      ];
    }

    case "updateRating": {
      return [
        param("id").isInt(),
        body("fromEntityId").isInt().optional(),
        body("fromEntityType").isString().optional(),
        body("toEntityId").isInt().optional(),
        body("toEntityType").isString().optional(),
        body("actionForEntityId").isInt().optional(),
        body("actionForEntityType").isString().optional(),
        body("value").isInt({ min: 0, max: 50 }).optional(),
        body("comment").optional(),
        body("status").isIn(statusesOfRatings).optional(),
        body("categoryOfRating").isInt().optional(),
      ];
    }

    case "addPublicRating": {
      return [
        body("service").isString(),
        body("hashString").isString(),
        body("value").isString(),
        body("comment").isString().optional(),
      ];
    }

    case "delete": {
      return [param("id").isInt()];
    }

    // case "deleteRating": {
    //   return [param("id").isInt()];
    // }

    default:
      break;
  }
};

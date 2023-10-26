const { body, param, query } = require("express-validator");

const DriverService = require("../services/drivers");
const ImageService = require("../services/images");
const LeadService = require("../services/leads");
const RouteService = require("../services/routes");

const Validations = require("../const/validatorSettings");
const Statuses = require("../enums/statuses");
const { userLogger } = require("../core/logger");
const loggerActions = require("./../enums/loggerActions");
const RatingService = require("../services/ratings");

const { ApplicationError } = require("./../classes/Errors");
const NotificationService = require("../services/notifications");
const { notifications } = require("../enums/notifications");

module.exports.getLeadById = async (req) => {
  const { id } = req.params;
  const lead = await LeadService.getLeadById(id);

  return { data: lead };
};

module.exports.getLeadsWithParams = async (req) => {
  if (req.query.routeId === "") {
    req.query.routeId = null;
  }

  const result = await LeadService.getLeadsWithParams(req.query);

  return { data: result.data, count: result.count };
};

module.exports.create = async (req, res, transaction) => {
  const leadData = {
    ...req.body,
  };

  const result = await LeadService.createLead(leadData, { transaction });

  const { images } = req.body;

  if (images) {
    await ImageService.normalizeLeadImages(images, result.id, transaction);
  }

  userLogger(
    loggerActions.CREATE_LEAD,
    {
      dataFromRequest: leadData,
      result: result,
    },
    req,
  );

  return {
    data: result,
  };
};

module.exports.delete = async (req, res, transaction) => {
  const { id } = req.params;

  await LeadService.deleteLead({ id }, { transaction });

  userLogger(
    loggerActions.DELETE_LEAD,
    {
      dataFromRequest: { id },
      result: { id },
    },
    req,
  );

  return {};
};

module.exports.update = async (req, res, transaction) => {
  const { id } = req.params;
  const { images, status } = req.body;

  const prevData = await LeadService.getLeadById(id, { transaction });

  if (images) {
    await ImageService.normalizeLeadImages(images, id, transaction);
  }

  // if (status === Statuses.BLOCKED || Statuses.INWORK) {
  const lead = prevData;
  const leadId = lead.id;
  const routeId = lead.routeId;
  // const leadId = id;

  if (routeId) {
    const route = await RouteService.getRouteInfoById(routeId);

    if (["finished"].includes(route.status)) {
      throw new ApplicationError(
        `Эта заявка находится в составе завершенного маршрута номер ${routeId}`,
        {
          path: "controller",
        },
      );
    }

    if (status === Statuses.FINISHED) {
      if (route.driverId) {
        const driver = await DriverService.getDriverById(route.driverId);
        await NotificationService.createNotification(
          {
            ...notifications.DRIVER_FINISH_LEAD,
            title: `Заявка №${leadId} изменена`,
            description: `Водитель (${driver.mobileNumber}) завершил заявку №${leadId}`,
            entityId: leadId,
          },
          { transaction },
        );
      }
    }
  }

  if (status === Statuses.FINISHED) {
    // set finish date
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    req.body.finishDate = req.body.finishDate || timestamp;
  }

  let choosedStatus = req.body.status;

  if (
    prevData.status === Statuses.FINISHED &&
    choosedStatus &&
    choosedStatus !== Statuses.FINISHED
  ) {
    // delete rating
    await RatingService.deleteRating({
      actionForEntityType: "lead",
      actionForEntityId: id,
    });

    await LeadService.update(
      {
        isSendedSmsRating: 0,
      },
      { id },
    );
  }

  const data = await LeadService.update(
    {
      ...req.body,
    },
    { id },
    { transaction },
  );

  userLogger(
    loggerActions.UPDATE_LEAD,
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

const validationLeadFilterFields = [
  query("comment").isString().optional(),
  query("status").isString().optional(),
  query("sellerId").isInt().optional(),
];

module.exports.validate = (method) => {
  switch (method) {
    case "getLeadById": {
      return [param("id").isInt()];
    }

    case "getLeadsWithParams": {
      return [
        ...validationLeadFilterFields,
        ...Validations.pagination,
        ...Validations.sorting,
      ];
    }

    case "create": {
      return [
        body("materialCategoryId").isInt(),
        body("capacity").isInt(),
        // body("userId").isInt(),
        body("comment").optional(),
        body("exportDate").exists(), // в будущем переделать
        //  body("finishDate").exists(), // в будущем переделать
        body("images").optional(), // в будущем переделать
      ];
    }

    case "update": {
      return [
        param("id").isInt(),
        body("materialCategoryId").isInt().optional(),
        body("capacity").isInt().optional(),
        // body("userId").isInt().optional(),
        body("comment").optional(),
        body("exportDate").exists().optional(), // в будущем переделать
        body("finishDate").exists().optional(), // в будущем переделать
        body("images").optional(), // в будущем переделать
      ];
    }

    case "delete": {
      return [param("id").isInt()];
    }

    default:
      break;
  }
};

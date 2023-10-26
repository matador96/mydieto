const { body, param, query } = require("express-validator");
const AcceptanceService = require("../services/acceptances");
const Validations = require("../const/validatorSettings");
const EntityCategoriesService = require("../services/entityCategories");
const { allStatuses } = require("../config/statusSettings");
const { getAddressInfo } = require("../core/dadata");
const AddressService = require("../services/addresses");
const Statuses = require("../enums/statuses");
const loggerActions = require("./../enums/loggerActions");
const { userLogger } = require("../core/logger");
const { ApplicationError } = require("./../classes/Errors");

module.exports.checkExistMobileNumber = async (req) => {
  const { mobile } = req.params;
  const acceptance = await AcceptanceService.getByMobileNumber(mobile);
  const resultObj = {
    isExist: !!acceptance,
  };
  if (resultObj.isExist) {
    resultObj.acceptanceId = acceptance.id;
  }

  return { data: resultObj };
};

module.exports.delete = async (req, res, transaction) => {
  const { id } = req.params;

  await AcceptanceService.deleteAcceptance({ id }, { transaction });

  userLogger(
    loggerActions.DELETE_ACCEPTANCE,
    {
      dataFromRequest: { id },
      result: { id },
    },
    req,
  );

  return {};
};

module.exports.activeAcceptance = async (req) => {
  const { id } = req.params;
  const { mobileNumber } = req.body;

  // const acceptance = await AcceptanceService.getAcceptanceById(id);

  // if (acceptance.status === Statuses.ACTIVE) {

  // throw new ApplicationError("Приемка уже активна", {
  //   path: "controller",
  // });
  // }

  const updatedAcceptance = await AcceptanceService.updateAcceptance(
    {
      status: Statuses.ACTIVE,
    },
    { id, mobileNumber },
  );

  if (!updatedAcceptance) {
    throw new ApplicationError("Приемка с таким номером не найдена", {
      path: "controller",
    });
  }

  return {
    data: updatedAcceptance,
  };
};

module.exports.getAcceptanceById = async (req) => {
  const { id } = req.params;
  const acceptance = await AcceptanceService.getAcceptanceById(id);

  return {
    data: acceptance,
  };
};

module.exports.getAcceptancesWithParams = async (req) => {
  const result = await AcceptanceService.getAcceptancesWithParams(req.query);

  return { data: result.data, count: result.count };
};

module.exports.createAcceptance = async (req, res, transaction) => {
  const { entityCategories } = req.body;
  const { address } = req.body;

  const addressInfo = await getAddressInfo(address);

  const acceptanceData = {
    ...req.body,
    districtId: addressInfo.districtId,
    geoLat: addressInfo.geo_lat,
    geoLon: addressInfo.geo_lon,
  };

  const result = await AcceptanceService.createAcceptance(
    acceptanceData,
    transaction,
  );

  if (address) {
    await AddressService.normalizeOneAddress(
      address,
      result.id,
      "acceptance",
      transaction,
    );
  }

  if (entityCategories) {
    await EntityCategoriesService.normalizeEntityCategoriesWithExtraFields(
      entityCategories,
      result.id,
      "acceptance",
      {
        transaction,
      },
    );
  }

  userLogger(
    loggerActions.CREATE_ACCEPTANCE,
    {
      dataFromRequest: acceptanceData,
      result,
    },
    req,
  );

  return {
    data: result,
  };
};

module.exports.updateAcceptance = async (req, res, transaction) => {
  const { entityCategories } = req.body;
  const { id } = req.params;

  const acceptanceUpdateData = req.body;

  if (entityCategories) {
    await EntityCategoriesService.normalizeEntityCategoriesWithExtraFields(
      entityCategories,
      id,
      "acceptance",
      transaction,
    );
  }

  if (acceptanceUpdateData?.address) {
    await AddressService.normalizeOneAddress(
      acceptanceUpdateData.address,
      id,
      "acceptance",
      transaction,
    );
  }

  // if (acceptanceUpdateData.address) {
  //   const addressInfo = await getAddressInfo(acceptanceUpdateData.address);
  //   acceptanceUpdateData.districtId = addressInfo.districtId;
  //   acceptanceUpdateData.geoLat = addressInfo.geo_lat;
  //   acceptanceUpdateData.geoLon = addressInfo.geo_lon;
  // }

  const acceptanceData = await AcceptanceService.updateAcceptance(
    {
      ...acceptanceUpdateData,
    },
    { id },
    { transaction },
  );

  userLogger(
    loggerActions.UPDATE_ACCEPTANCE,
    {
      dataFromRequest: {
        entityCategories,
        ...acceptanceUpdateData,
        id,
      },
      result: acceptanceData,
    },
    req,
  );

  return {
    data: acceptanceData,
  };
};

const validationAcceptanceFilterFields = [
  query("mobileNumber").isString().optional(),
];

module.exports.validate = (method) => {
  switch (method) {
    case "checkExistMobileNumber": {
      return [param("mobile").isInt()];
    }

    case "getAcceptanceById": {
      return [param("id").isInt()];
    }

    case "getAcceptancesWithParams": {
      return [
        ...validationAcceptanceFilterFields,
        ...Validations.pagination,
        ...Validations.sorting,
      ];
    }

    case "createAcceptance": {
      return [
        body("title").isString(),
        body("firstName").isString(),
        body("lastName").isString().optional(),
        body("driverId").optional(),
        body("mobileNumber").isString(),
        body("address").isString(),
        body("comment").optional(),
        body("status").isIn(allStatuses).optional(),
        body("entityCategories").optional(),
      ];
    }

    case "activeAcceptance": {
      return [param("id").isInt(), body("mobileNumber").isString()];
    }

    case "updateAcceptance": {
      return [
        param("id").isInt(),
        body("title").isString().optional(),
        body("firstName").isString().optional(),
        body("lastName").isString().optional(),
        body("driverId").optional(),
        body("comment").optional(),
        body("mobileNumber").isString().optional(),
        body("address").isString().optional(),
        body("status").isIn(allStatuses).optional(),
      ];
    }

    case "delete": {
      return [param("id").isInt()];
    }

    default:
      break;
  }
};

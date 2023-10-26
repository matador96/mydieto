const { body, param, query } = require("express-validator");
const FAQService = require("../services/faqs");
const Validations = require("../const/validatorSettings");
const { statusesOfFAQs } = require("../config/statusSettings");
const { services } = require("../const/services");
const { userLogger } = require("../core/logger");
const loggerActions = require("./../enums/loggerActions");

module.exports.getFAQById = async (req) => {
  const { id } = req.params;
  const data = await FAQService.getFAQById(id);

  return { data };
};

module.exports.getFAQsWithParams = async (req) => {
  const result = await FAQService.getFAQsWithParams(req.query);

  return { data: result.data, count: result.count };
};

module.exports.delete = async (req) => {
  const { id } = req.params;

  await FAQService.deleteFAQ({ id });

  userLogger(
    loggerActions.DELETE_FAQ,
    {
      dataFromRequest: { id },
      result: { id },
    },
    req,
  );

  return {};
};

module.exports.createFAQ = async (req) => {
  const data = {
    ...req.body,
  };

  const result = await FAQService.createFAQ(data);

  userLogger(
    loggerActions.CREATE_FAQ,
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

module.exports.updateFAQ = async (req) => {
  const { id } = req.params;

  const data = await FAQService.updateFAQ(
    {
      ...req.body,
    },
    { id },
  );

  userLogger(
    loggerActions.UPDATE_FAQ,
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

const validationFAQFilterFields = [
  query("service").isString().optional(),
  // query("status").isIn(statusesOfFAQs).optional(),
];

module.exports.validate = (method) => {
  switch (method) {
    case "getFAQById": {
      return [param("id").isInt()];
    }

    case "getFAQsWithParams": {
      return [
        ...validationFAQFilterFields,
        ...Validations.pagination,
        ...Validations.sorting,
      ];
    }

    case "createFAQ": {
      return [
        body("title").isString(),
        body("description").isString(),
        body("service").isIn(services),
      ];
    }

    case "updateFAQ": {
      return [
        param("id").isInt(),
        body("title").isString().optional(),
        body("priority").isInt().optional(),
        body("description").isString().optional(),
        body("service").isIn(services).optional(),
        body("status").isIn(statusesOfFAQs).optional(),
      ];
    }

    case "delete": {
      return [param("id").isInt()];
    }

    default:
      break;
  }
};

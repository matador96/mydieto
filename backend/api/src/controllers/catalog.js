const { body, param, query } = require("express-validator");
const Validations = require("../const/validatorSettings");
const { allStatuses } = require("../config/statusSettings");

const CatalogService = require("../services/catalogs");
const ImageService = require("../services/images");

module.exports.getById = async (req) => {
  const { id } = req.params;
  const catalog = await CatalogService.getById(id);

  return { data: catalog };
};

module.exports.getWithParams = async (req) => {
  const result = await CatalogService.getWithParams(req.query);
  return { data: result.data, count: result.count };
};

module.exports.getCatalogsWithParamsByParentId = async (req) => {
  const { parentId } = req.params;

  const result = await CatalogService.getWithParamsByParentId({
    ...req.query,
    parentId,
  });

  return { data: result.data, count: result.count };
};

module.exports.create = async (req, res, transaction) => {
  const catalogData = {
    ...req.body,
  };
  let catalog = await CatalogService.create(catalogData, { transaction });

  if (req?.files?.image) {
    const image = req?.files?.image;
    if (image) {
      const imageFromDisk = await ImageService.uploadImageToDisk(image, catalog);
      catalog = await CatalogService.update(
        { img: imageFromDisk.id },
        { id: catalog.id },
        { transaction },
      );
    }
  }

  return {
    data: catalog,
  };
};

module.exports.update = async (req, res, transaction) => {
  const { id } = req.params;
  const catalogData = {
    ...req.body,
  };

  const prevData = await CatalogService.getById(id, { transaction });

  if (req?.files?.image) {
    const image = req?.files?.image;
    if (image) {
      if (prevData.img) {
        await ImageService.deleteImage(prevData.img);
      }
      const imageFromDisk = await ImageService.uploadImageToDisk(image, prevData);
      catalogData.img = imageFromDisk.id;
    }
  }
  const catalog = await CatalogService.update(catalogData, { id }, { transaction });

  return {
    data: catalog,
  };
};

const validationSellerFilterFields = [];

module.exports.validate = (method) => {
  switch (method) {
    case "getCatalogById": {
      return [param("id").isInt()];
    }

    case "getCatalogsWithParams": {
      return [
        ...validationSellerFilterFields,
        ...Validations.pagination,
        ...Validations.sorting,
      ];
    }

    case "create": {
      return [
        body("name").isString(),
        body("img").isString(),
        body("parentId").isInt(),
        body("priority").isInt(),
        body("unit").isString().optional(),
        body("status").isIn(allStatuses).optional(),
      ];
    }

    case "update": {
      return [
        param("id").isInt(),
        body("name").isString().optional(),
        body("img").isString().optional(),
        body("unit").isString().optional(),
        body("parentId").isInt().optional(),
        body("priority").isInt().optional(),
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

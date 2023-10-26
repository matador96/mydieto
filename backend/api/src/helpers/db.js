const _ = require("lodash");
const filterFields = require("../const/filterFields");
// const Sequelize = require("sequelize");

const { fieldOpSettings } = filterFields; //nameOfTables
// const modelNamesWithStringStatus = ["category"];

const getFilterOpValue = (modelName, fieldName, value) => {
  const op = fieldOpSettings?.[modelName]?.[fieldName];
  return {
    op: fieldOpSettings?.[modelName]?.[fieldName] || "$eq",
    value: op === "$like" ? `%${value}%` : value,
  };
};

const generateDatabaseSetting = (queryParams, modelName = null) => {
  let { limit, page, sort, order, op } = queryParams;

  let initialObj = {
    subQuery: false,
  };

  if (limit) {
    limit = parseInt(limit);
    initialObj = { ...initialObj, limit: limit };

    if (page) {
      page = parseInt(page);
      initialObj = { ...initialObj, offset: (page - 1) * limit };
    }
  }

  if (sort && order) {
    initialObj = { ...initialObj, order: [[sort, order]] };
  }

  if (modelName) {
    const filteredParams = _.pick(queryParams, filterFields[modelName]);

    let preparedFilteredParams = _.mapValues(filteredParams, (value, key) => {
      const filterOpObj = getFilterOpValue(modelName, key, value);

      if (Array.isArray(value) && filterOpObj.op === "$eq") {
        return { $in: filterOpObj.value };
      }

      return { [filterOpObj.op]: filterOpObj.value };
    });

    // if (!modelNamesWithStringStatus.includes(modelName)) {
    //   if ("status" in preparedFilteredParams) {
    //     const filterStatusObj = Sequelize.where(
    //       Sequelize.cast(Sequelize.col(`${nameOfTables[modelName]}.status`), "text"),
    //       preparedFilteredParams["status"],
    //     );
    //     delete preparedFilteredParams["status"];

    //     preparedFilteredParams = [preparedFilteredParams, filterStatusObj];
    //   }
    // }

    const isHaveFilter = Object.keys(filteredParams).length > 0;
    if (isHaveFilter) {
      let filterOperator;
      switch (op) {
        case "and":
          filterOperator = "$and";
          break;
        case "or":
          filterOperator = "$or";
          break;
        default:
          filterOperator = "$and";
          break;
      }
      initialObj = {
        ...initialObj,
        where: { [filterOperator]: preparedFilteredParams },
      };
    }
  }

  return initialObj;
};

module.exports = {
  generateDatabaseSetting,
};

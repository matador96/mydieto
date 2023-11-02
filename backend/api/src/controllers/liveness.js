const CatalogService = require("../services/catalogs");

module.exports.getTestData = async () => {
  const { data: result } = await CatalogService.getWithParams({
    limit: 5,
    page: 1,
  });

  return { data: result, count: result.count };
};

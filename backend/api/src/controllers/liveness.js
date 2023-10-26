const CategoryService = require("../services/categories");

module.exports.getTestData = async () => {
  const { data: result } = await CategoryService.getWithParams({
    limit: 5,
    page: 1,
  });

  return { data: result, count: result.count };
};

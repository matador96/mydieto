const ArticleService = require("../services/articles");

module.exports.getTestData = async () => {
  const { data: result } = await ArticleService.getWithParams({
    limit: 5,
    page: 1,
  });

  return { data: result, count: result.count };
};

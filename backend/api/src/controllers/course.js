const CourseService = require("../services/courses");

module.exports.getById = async (req) => {
  const { id } = req.params;
  const result = await CourseService.getById(id);

  return { data: result };
};

module.exports.getWithParams = async (req) => {
  const result = await CourseService.getWithParams(req.query);
  return { data: result.data, count: result.count };
};

module.exports.getTags = async () => {
  const result = await CourseService.getTags();
  return { data: result.data };
};

module.exports.create = async (req, res, transaction) => {
  const currentSessionUserId = req?.user?.profile?.id;

  const newData = {
    ...req.body,
    userId: currentSessionUserId,
  };

  let result = await CourseService.create(newData, { transaction });
  return {
    data: result,
  };
};

module.exports.update = async (req, res, transaction) => {
  const { id } = req.params;
  const newData = {
    ...req.body,
  };

  const result = await CourseService.update(newData, { id }, { transaction });

  return {
    data: result,
  };
};

const ReviewService = require("../services/reviews");
const CourseService = require("../services/courses");

module.exports.getById = async (req) => {
  const { id } = req.params;
  const result = await ReviewService.getById(id);

  return { data: result };
};

module.exports.getWithParams = async (req) => {
  const result = await ReviewService.getWithParams(req.query);
  return { data: result.data, count: result.count };
};

module.exports.create = async (req, res, transaction) => {
  const currentSessionUserId = req?.user?.profile?.id;
  const courseInfo = await CourseService.getById(req.body.courseId);

  const newData = {
    ...req.body,
    instructorId: courseInfo.instructorId,
    userId: currentSessionUserId,
  };

  let result = await ReviewService.create(newData, { transaction });

  return {
    data: result,
  };
};

module.exports.update = async (req, res, transaction) => {
  const { id } = req.params;
  const newData = {
    ...req.body,
  };

  const result = await ReviewService.update(id, newData, { transaction });

  return {
    data: result,
  };
};

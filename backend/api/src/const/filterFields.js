const articleFieldsCanBeFilter = ["id", "title"];
const userFieldsCanBeFilter = ["id", "email"];
const faqFieldsCanBeFilter = ["id", "status"];
const courseFieldsCanBeFilter = ["id", "status"];
const reviewFieldsCanBeFilter = ["id", "instructorId", "courseId"];

module.exports = {
  article: articleFieldsCanBeFilter,
  user: userFieldsCanBeFilter,
  faq: faqFieldsCanBeFilter,
  course: courseFieldsCanBeFilter,
  review: reviewFieldsCanBeFilter,

  fieldOpSettings: {
    article: {
      id: "$eq",
      sellerId: "$eq",
      title: "$like",
    },
    course: {
      id: "$eq",
      instructorId: "$eq",
      title: "$like",
    },
    review: {
      id: "$eq",
      instructorId: "$eq",
      courseId: "$eq",
      status: "$eq",
    },
    faq: {
      id: "$eq",
      status: "$eq",
    },
    user: {
      id: "$eq",
      email: "$like",
    },
  },
};

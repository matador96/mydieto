const articleFieldsCanBeFilter = ["id", "title"];
const userFieldsCanBeFilter = ["id", "email"];
const faqFieldsCanBeFilter = ["id", "status"];
const courseFieldsCanBeFilter = ["id", "status"];

module.exports = {
  article: articleFieldsCanBeFilter,
  user: userFieldsCanBeFilter,
  faq: faqFieldsCanBeFilter,
  course: courseFieldsCanBeFilter,

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

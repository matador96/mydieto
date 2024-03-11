const articleFieldsCanBeFilter = ["id", "name"];
const userFieldsCanBeFilter = ["id", "email"];
const faqFieldsCanBeFilter = ["id", "status"];

module.exports = {
  article: articleFieldsCanBeFilter,
  user: userFieldsCanBeFilter,
  faq: faqFieldsCanBeFilter,

  fieldOpSettings: {
    article: {
      id: "$eq",
      sellerId: "$eq",
      name: "$like",
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

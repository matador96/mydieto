const articleFieldsCanBeFilter = ["id", "name"];
const userFieldsCanBeFilter = ["id", "email"];

module.exports = {
  article: articleFieldsCanBeFilter,
  user: userFieldsCanBeFilter,

  fieldOpSettings: {
    article: {
      id: "$eq",
      sellerId: "$eq",
      name: "$like",
    },
    user: {
      id: "$eq",
      email: "$like",
    },
  },
};

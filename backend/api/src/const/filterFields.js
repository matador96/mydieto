const addressFieldsCanBeFilter = ["id", "sellerId", "status"];
const adminFieldsCanBeFilter = ["id"];
const articleFieldsCanBeFilter = ["id", "name"];
const managerFieldsCanBeFilter = ["id"];
const orderFieldsCanBeFilter = ["id", "sellerId", "statusId"];
const orderItemFieldsCanBeFilter = ["id", "articleId", "status"];
const orderStatusFieldsCanBeFilter = ["id", "orderId", "status"];
const sellerFieldsCanBeFilter = ["id", "firstName", "lastName", "status"];
const storageFieldsCanBeFilter = ["id", "articleId", "sellerId"];
const userFieldsCanBeFilter = ["id", "email"];

module.exports = {
  admin: adminFieldsCanBeFilter,
  address: addressFieldsCanBeFilter,
  article: articleFieldsCanBeFilter,
  manager: managerFieldsCanBeFilter,
  order: orderFieldsCanBeFilter,
  orderItem: orderItemFieldsCanBeFilter,
  orderStatus: orderStatusFieldsCanBeFilter,
  seller: sellerFieldsCanBeFilter,
  storage: storageFieldsCanBeFilter,
  user: userFieldsCanBeFilter,

  fieldOpSettings: {
    admin: {
      id: "$eq",
    },
    address: {
      id: "$eq",
      sellerId: "$eq",
      status: "$eq",
    },
    article: {
      id: "$eq",
      sellerId: "$eq",
      name: "$like",
    },
    manager: {
      id: "$eq",
    },
    order: {
      id: "$eq",
      sellerId: "$eq",
      statusId: "$eq",
    },
    orderItem: {
      id: "$eq",
      articleId: "$eq",
      status: "$eq",
    },
    orderStatus: {
      id: "$eq",
      orderId: "$eq",
      status: "$eq",
    },
    seller: {
      id: "$eq",
      firstName: "$like",
      lastName: "$like",
      status: "$eq",
    },

    storage: {
      id: "$eq",
      sellerId: "$eq",
      articleId: "$eq",
    },
    user: {
      id: "$eq",
      email: "$like",
    },
  },
};

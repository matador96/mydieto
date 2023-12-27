const addressFieldsCanBeFilter = ["id", "sellerId", "status"];
const adminFieldsCanBeFilter = ["id"];
const catalogFieldsCanBeFilter = ["id", "name", "parentId"];
const managerFieldsCanBeFilter = ["id"];
const orderFieldsCanBeFilter = ["id", "sellerId", "statusId"];
const orderItemFieldsCanBeFilter = ["id", "catalogId", "status"];
const orderStatusFieldsCanBeFilter = ["id", "orderId", "status"];
const sellerFieldsCanBeFilter = ["id", "mobile", "firstName", "lastName", "status"];
const storageFieldsCanBeFilter = ["id", "catalogId", "sellerId"];
const userFieldsCanBeFilter = ["id", "email"];

module.exports = {
  admin: adminFieldsCanBeFilter,
  address: addressFieldsCanBeFilter,
  catalog: catalogFieldsCanBeFilter,
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
    catalog: {
      id: "$eq",
      sellerId: "$eq",
      name: "$like",
      parentId: "$in",
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
      catalogId: "$eq",
      status: "$eq",
    },
    orderStatus: {
      id: "$eq",
      orderId: "$eq",
      status: "$eq",
    },
    seller: {
      id: "$eq",
      mobile: "$eq",
      firstName: "$like",
      lastName: "$like",
      status: "$eq",
    },

    storage: {
      id: "$eq",
      sellerId: "$eq",
      catalogId: "$eq",
    },
    user: {
      id: "$eq",
      email: "$like",
    },
  },
};

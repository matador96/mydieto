const adminFieldsCanBeFilter = ["id"];
const catalogFieldsCanBeFilter = ["id", "name", "parentId"];
const storageFieldsCanBeFilter = ["id", "catalogId", "sellerId"];

const sellerFieldsCanBeFilter = ["id", "mobile", "firstName", "lastName", "status"];

const userFieldsCanBeFilter = ["id", "email"];
const addressFieldsCanBeFilter = ["id", "sellerId", "status"];
const orderFieldsCanBeFilter = [
  "id",
  "sellerId",
  "price",
  "facticalPrice",
  "statusId",
];
const orderItemFieldsCanBeFilter = ["id", "catalogId", "status"];
const orderStatusFieldsCanBeFilter = ["id", "orderId", "status"];

module.exports = {
  admin: adminFieldsCanBeFilter,
  address: addressFieldsCanBeFilter,
  catalog: catalogFieldsCanBeFilter,
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
      parentId: "$eq",
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
      mobile: "$like",
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

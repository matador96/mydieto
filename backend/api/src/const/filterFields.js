const adminFieldsCanBeFilter = ["id"];
const catalogFieldsCanBeFilter = ["id", "name", "parentId"];
const storageFieldsCanBeFilter = ["id", "catalogId", "sellerId"];

const sellerFieldsCanBeFilter = ["id", "mobile", "firstName", "lastName", "status"];

const userFieldsCanBeFilter = ["id", "email"];
const addressFieldsCanBeFilter = ["id", "sellerId", "status"];

module.exports = {
  admin: adminFieldsCanBeFilter,
  catalog: catalogFieldsCanBeFilter,
  seller: sellerFieldsCanBeFilter,
  user: userFieldsCanBeFilter,
  address: addressFieldsCanBeFilter,
  storage: storageFieldsCanBeFilter,
  fieldOpSettings: {
    admin: {
      id: "$eq",
    },
    catalog: {
      id: "$eq",
      sellerId: "$eq",
      name: "$like",
      parentId: "$eq",
    },
    user: {
      id: "$eq",
      email: "$like",
    },
    seller: {
      id: "$eq",
      mobile: "$like",
      firstName: "$like",
      lastName: "$like",
      status: "$eq",
    },
    address: {
      id: "$eq",
      sellerId: "$eq",
      status: "$eq",
    },
    storage: {
      id: "$eq",
      sellerId: "$eq",
      catalogId: "$eq",
    },
  },
};

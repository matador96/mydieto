const adminFieldsCanBeFilter = ["id"];
const catalogFieldsCanBeFilter = ["id", "name", "parentId"];
const storageFieldsCanBeFilter = ["id", "catalogId", "sellerId"];

const sellerFieldsCanBeFilter = ["id", "mobile", "firstName", "lastName", "status"];

const userFieldsCanBeFilter = ["id", "email"];
const addressFieldsCanBeFilter = ["id", "sellerId", "status"];
const orderFieldsCanBeFilter = ["id", "sellerId", "price", "status"];

module.exports = {
  admin: adminFieldsCanBeFilter,
  address: addressFieldsCanBeFilter,
  catalog: catalogFieldsCanBeFilter,
  order: orderFieldsCanBeFilter,
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
      price: "$eq",
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

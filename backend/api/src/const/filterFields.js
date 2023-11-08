const adminFieldsCanBeFilter = ["id"];
const catalogFieldsCanBeFilter = ["id", "name", "parentId"];

const sellerFieldsCanBeFilter = [
  "id",
  "mobileNumber",
  "firstName",
  "lastName",
  "status",
];

const userFieldsCanBeFilter = ["id", "email"];
const addressFieldsCanBeFilter = ["id", "sellerId", "status"];

module.exports = {
  admin: adminFieldsCanBeFilter,
  catalog: catalogFieldsCanBeFilter,
  seller: sellerFieldsCanBeFilter,
  user: userFieldsCanBeFilter,
  address: addressFieldsCanBeFilter,
  fieldOpSettings: {
    admin: {
      id: "$eq",
    },
    catalog: {
      id: "$eq",
      name: "$like",
      parentId: "$eq",
    },
    user: {
      id: "$eq",
      email: "$like",
    },
    seller: {
      id: "$eq",
      mobileNumber: "$like",
      firstName: "$like",
      lastName: "$like",
      status: "$eq",
    },
    address: {
      id: "$eq",
      sellerId: "$eq",
      status: "$eq",
    },
  },
};

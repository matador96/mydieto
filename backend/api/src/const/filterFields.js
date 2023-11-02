const sellerFieldsCanBeFilter = [
  "id",
  "mobileNumber",
  "firstName",
  "lastName",
  "status",
];
const userFieldsCanBeFilter = ["id", "email"];


module.exports = {
  seller: sellerFieldsCanBeFilter,
  user: userFieldsCanBeFilter,
  fieldOpSettings: {
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
  },

  // nameOfTables: {
  //   lead: "leads",
  //   driver: "drivers",
  //   route: "routes",
  //   seller: "sellers",
  //   faq: "faqs",
  //   acceptance: "acceptances",
  //   auction: "auctions",
  //   rating: "ratings",
  // },
};

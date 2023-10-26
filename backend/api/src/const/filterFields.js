const categoryFieldsCanBeFilter = ["id", "status", "parentId"];
const driverFieldsCanBeFilter = [
  "id",
  "mobileNumber",
  "status",
  "firstName",
  "lastName",
  "carSTS",
  "carNumber",
];
const sellerFieldsCanBeFilter = [
  "id",
  "mobileNumber",
  "firstName",
  "lastName",
  "status",
];
const userFieldsCanBeFilter = ["login"];
const leadFieldsCanBeFilter = ["id", "status", "routeId"];
const routeFieldsCanBeFilter = ["id", "driverId", "status"];
const addressFieldsCanBeFilter = ["id"];
const faqsFieldsCanBeFilter = ["id", "status", "service"];
const auctionsFieldsCanBeFilter = ["id", "status"];
const acceptancesFieldsCanBeFilter = [
  "id",
  "status",
  "mobileNumber",
  "title",
  "firstName",
  "lastName",
];
const ratingsFieldsCanBeFilter = [
  "id",
  "fromEntityId",
  "fromEntityType",
  "toEntityId",
  "toEntityType",
  "actionForEntityId",
  "actionForEntityType",
  "status",
];

module.exports = {
  category: categoryFieldsCanBeFilter,
  driver: driverFieldsCanBeFilter,
  seller: sellerFieldsCanBeFilter,
  user: userFieldsCanBeFilter,
  lead: leadFieldsCanBeFilter,
  route: routeFieldsCanBeFilter,
  address: addressFieldsCanBeFilter,
  faq: faqsFieldsCanBeFilter,
  acceptance: acceptancesFieldsCanBeFilter,
  auction: auctionsFieldsCanBeFilter,
  rating: ratingsFieldsCanBeFilter,
  fieldOpSettings: {
    lead: {
      id: "$eq",
      status: "$eq",
      routeId: "$eq",
    },
    user: {
      login: "$like",
    },
    driver: {
      id: "$eq",
      mobileNumber: "$like",
      status: "$eq",
      firstName: "$like",
      lastName: "$like",
      carSTS: "$like",
      carNumber: "$like",
    },
    category: {
      id: "$eq",
      status: "$eq",
      parentId: "$eq",
    },
    seller: {
      id: "$eq",
      status: "$eq",
      mobileNumber: "$like",
      firstName: "$like",
      lastName: "$like",
    },
    route: {
      id: "$eq",
      driverId: "$eq",
      status: "$eq",
    },
    address: {
      id: "$eq",
    },
    entityCategories: {
      id: "$eq",
    },
    faq: {
      id: "$eq",
      service: "$like",
      status: "$eq",
    },
    acceptance: {
      id: "$eq",
      status: "$eq",
      mobileNumber: "$like",
      title: "$like",
      firstName: "$like",
      lastName: "$like",
    },
    auction: {
      id: "$eq",
      status: "$eq",
    },
    rating: {
      id: "$eq",
      fromEntityId: "$eq",
      fromEntityType: "$like",
      toEntityId: "$eq",
      toEntityType: "$like",
      actionForEntityId: "$eq",
      actionForEntityType: "$like",
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

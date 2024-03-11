const FAQController = require("../controllers/faq");
const { authenticate } = require("../middleware/authenticate");
const { validationChecker } = require("../middleware/validationChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/faq/:id",
    middlewares: [],
    method: FAQController.getFAQById,
  },

  {
    type: "get",
    url: "/api/v1/faqs",
    middlewares: [],
    method: FAQController.getFAQsWithParams,
  },

  {
    type: "post",
    url: "/api/v1/faq",
    middlewares: [],
    method: FAQController.createFAQ,
  },
  {
    type: "put",
    url: "/api/v1/faq/:id",
    middlewares: [],
    method: FAQController.updateFAQ,
  },
  {
    type: "delete",
    url: "/api/v1/faq/:id",
    middlewares: [],
    method: FAQController.delete,
  },
];

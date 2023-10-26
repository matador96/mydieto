const FAQController = require("../controllers/faq");
const { authenticate } = require("../middleware/authenticate");
const { roleChecker } = require("../middleware/roleChecker");
const { validationChecker } = require("../middleware/validationChecker");
const Permissions = require("../enums/permissions");
const { apiKeyChecker } = require("../middleware/apiKeyChecker");

module.exports = [
  {
    type: "get",
    url: "/api/v1/faq/:id",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_view_faqs),
      FAQController.validate("getFAQById"),
      validationChecker,
    ],
    method: FAQController.getFAQById,
  },

  {
    type: "get",
    url: "/api/v1/faqs",
    middlewares: [
      apiKeyChecker,
      authenticate,
      roleChecker(Permissions.can_view_faqs),
      FAQController.validate("getFAQsWithParams"),
      validationChecker,
    ],
    method: FAQController.getFAQsWithParams,
  },

  {
    type: "post",
    url: "/api/v1/faq",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_create_faqs),
      FAQController.validate("createFAQ"),
      validationChecker,
    ],
    method: FAQController.createFAQ,
  },
  {
    type: "put",
    url: "/api/v1/faq/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_edit_faqs),
      FAQController.validate("updateFAQ"),
      validationChecker,
    ],
    method: FAQController.updateFAQ,
  },
  {
    type: "delete",
    url: "/api/v1/faq/:id",
    middlewares: [
      authenticate,
      roleChecker(Permissions.can_delete_faqs),
      FAQController.validate("delete"),
      validationChecker,
    ],
    method: FAQController.delete,
  },
];

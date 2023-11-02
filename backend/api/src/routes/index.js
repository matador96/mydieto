const { errorResponse, successResponse } = require("../controllers/index");
const sequelize = require("../core/db");

async function tryCatchResponseWrapper(req, res, callback, withTransaction = false) {
  const transaction = withTransaction ? await sequelize.transaction() : null;
  try {
    const result = await callback(req, res, transaction);
    await transaction?.commit();
    successResponse(res, result);
  } catch (error) {
    await transaction?.rollback();
    errorResponse(res, error);
    console.error("An error occurred:", error);
  }
}

const allRoutes = [
  ...require("./admins"),
  ...require("./catalogs"),
  ...require("./sellers"),
  ...require("./users"),

  ...require("./acceptances"),
  ...require("./driver"),
  ...require("./categories"),
  ...require("./leads"),
  ...require("./images"),
  ...require("./liveness"),
  ...require("./routes"), // маршруты
  ...require("./ratings"),
  ...require("./addresses"),
  ...require("./faqs"),
  ...require("./auctions"),
  ...require("./stats"),
  ...require("./const"),
  ...require("./logs"),
  ...require("./mobileNumbers"),
  ...require("./notifications"),
];

module.exports = (app) => {
  allRoutes.map((e) =>
    app[e.type](
      e.url,
      ...e.middlewares,
      async (req, res) =>
        await tryCatchResponseWrapper(req, res, e.method, e.withTransaction),
    ),
  );
};

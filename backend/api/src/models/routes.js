const Sequelize = require("sequelize");
const sequelize = require("../core/db");
const Drivers = require("./drivers");
const Ratings = require("./ratings");
const Leads = require("./leads");
const { statusesOfRoutes } = require("../config/statusSettings");

const Routes = sequelize.define(
  "routes",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    driverId: {
      field: "driverId",
      type: Sequelize.INTEGER,
      references: {
        model: "drivers",
        key: "id",
      },
    },
    status: {
      field: "status",
      type: Sequelize.ENUM(statusesOfRoutes),
    },
    suggestedBuyPrice: {
      field: "suggestedBuyPrice",
      type: Sequelize.INTEGER,
    },
    commission: {
      field: "commission",
      type: Sequelize.INTEGER,
    },
  },
  {
    // hooks: {
    //   afterBulkUpdate: async (options) => {
    //     await RouteService.getRouteById(options.where.id).then(async (obj) => {
    //       await updateObject("route", obj);
    //     });
    //   },
    // },
    timestamps: true,
  },
);

// Leads.afterBulkUpdate(async (options) => {
//   await Promise.all(
//     options.where.id.map((leadId) =>
//       LeadService.getLeadById(leadId).then(async (lead) => {
//         if (lead.routeId) {
//           const routeObj = await RouteService.getRouteById(lead.routeId);
//           await updateObject("route", routeObj);
//         }
//       }),
//     ),
//   );
// });

Routes.belongsTo(Drivers, {
  foreignKey: "driverId",
});

Drivers.hasMany(Routes, {
  foreignKey: "driverId",
  as: "inWorkRoute",
});

Routes.hasMany(Leads, {
  foreignKey: "routeId",
});

Ratings.belongsTo(Routes, {
  foreignKey: "actionForEntityId",
});

Routes.hasOne(Ratings, {
  foreignKey: "actionForEntityId",
});

Leads.belongsTo(Routes, {
  foreignKey: "routeId",
});

module.exports = Routes;

const Sequelize = require("sequelize");
const sequelize = require("../core/db");
const Leads = require("./leads");

const { statusOfAuctions } = require("../config/statusSettings");

const Auctions = sequelize.define(
  "auctions",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    leadId: {
      field: "leadId",
      type: Sequelize.INTEGER,
      references: {
        model: "leads",
        key: "id",
      },
    },
    startPrice: {
      field: "startPrice",
      type: Sequelize.INTEGER,
    },
    // commission: {
    //   field: "commission",
    //   type: Sequelize.INTEGER,
    // },
    winnerId: {
      field: "winnerId",
      type: Sequelize.INTEGER,
      references: {
        model: "acceptances",
        key: "id",
      },
    },
    startTime: {
      field: "startTime",
      type: Sequelize.DATE,
    },
    endTime: {
      field: "endTime",
      type: Sequelize.DATE,
    },
    status: {
      field: "status",
      type: Sequelize.ENUM(statusOfAuctions),
    },
  },
  {
    timestamps: true,
  },
);

Auctions.belongsTo(Leads, {
  foreignKey: "leadId",
});

// Auctions.belongsTo(Acceptances, {
//   foreignKey: "winnerId",
// });

module.exports = Auctions;

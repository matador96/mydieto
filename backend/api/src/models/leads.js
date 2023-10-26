const Sequelize = require("sequelize");
const sequelize = require("../core/db");
const Categories = require("./categories");
const Addresses = require("./addresses");
const Ratings = require("./ratings");
const Users = require("./users");
const { statusOfLeads } = require("../config/statusSettings");
const Images = require("./images");

const Leads = sequelize.define(
  "leads",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    materialCategoryId: {
      field: "materialCategoryId",
      type: Sequelize.INTEGER,
      references: {
        model: "materialCategories",
        key: "id",
      },
    },
    capacity: {
      field: "capacity",
      type: Sequelize.INTEGER,
    },
    isSendedSmsRating: {
      field: "isSendedSmsRating",
      type: Sequelize.INTEGER,
    },
    exportDate: {
      field: "exportDate",
      type: Sequelize.DATE,
    },
    finishDate: {
      field: "finishDate",
      type: Sequelize.DATE,
    },
    comment: {
      field: "comment",
      type: Sequelize.STRING,
    },
    addressId: {
      field: "addressId",
      type: Sequelize.INTEGER,
      references: {
        model: "addresses",
        key: "id",
      },
    },
    routeId: {
      field: "routeId",
      type: Sequelize.INTEGER,
      references: {
        model: "routes",
        key: "id",
      },
    },
    userId: {
      field: "userId",
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    status: {
      field: "status",
      type: Sequelize.ENUM(statusOfLeads),
    },
  },
  {
    timestamps: true,
  },
);

Leads.belongsTo(Categories, {
  foreignKey: "materialCategoryId",
});

Leads.belongsTo(Addresses, {
  foreignKey: "addressId",
});

Leads.belongsTo(Users, {
  foreignKey: "userId",
});

Leads.hasMany(Images, { foreignKey: "leadId" });

Ratings.belongsTo(Leads, {
  foreignKey: "actionForEntityId",
});

Leads.hasOne(Ratings, {
  foreignKey: "actionForEntityId",
});

module.exports = Leads;

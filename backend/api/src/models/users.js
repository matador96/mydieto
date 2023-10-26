const Sequelize = require("sequelize");
const sequelize = require("../core/db");
const { allStatues } = require("../config/statusSettings");
const Ratings = require("./ratings");

const Users = sequelize.define(
  "users",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      field: "login",
      type: Sequelize.STRING,
    },
    password: {
      field: "password",
      type: Sequelize.STRING,
    },
    firstName: {
      field: "firstName",
      type: Sequelize.STRING,
    },
    lastName: {
      field: "lastName",
      type: Sequelize.STRING,
    },
    post: {
      field: "post",
      type: Sequelize.STRING,
    },
    roleId: {
      field: "roleId",
      type: Sequelize.INTEGER,
    },
    email: {
      field: "email",
      type: Sequelize.STRING,
    },
    status: {
      field: "status",
      type: Sequelize.ENUM(allStatues),
    },
  },
  {
    timestamps: true,
  },
);

Ratings.belongsTo(Users, {
  foreignKey: "fromEntityId",
});

module.exports = Users;

const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");
const Sellers = require("./sellers");
const Admins = require("./admins");

const Users = sequelize.define(
  "users",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      field: "email",
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      field: "password",
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  },
);

Users.hasOne(Sellers, {
  foreignKey: "userId",
});
Sellers.belongsTo(Users, {
  foreignKey: "userId",
});

Users.hasOne(Admins, {
  foreignKey: "userId",
});
Admins.belongsTo(Users, {
  foreignKey: "userId",
});

module.exports = Users;

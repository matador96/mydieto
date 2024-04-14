const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");
const { statusesOfUsers } = require("../config/statusSettings");
const Reviews = require("./reviews");
const { cryptPassword, comparePassword } = require("../core/encrypt");
const bcrypt = require("bcrypt");

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
    status: {
      field: "status",
      type: DataTypes.ENUM(statusesOfUsers),
    },
  },
  {
    timestamps: true,
  },
);

const Admins = sequelize.define(
  "admins",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      field: "userId",
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    firstName: {
      field: "firstName",
      type: DataTypes.STRING,
    },
    lastName: {
      field: "lastName",
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  },
);

const Instructors = sequelize.define(
  "instructors",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      field: "userId",
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    firstName: {
      field: "firstName",
      type: DataTypes.STRING,
    },
    lastName: {
      field: "lastName",
      type: DataTypes.STRING,
    },
    age: {
      field: "age",
      type: DataTypes.INTEGER,
    },
    experience: {
      field: "experience",
      type: DataTypes.INTEGER,
    },
    marker: {
      field: "marker",
      type: DataTypes.STRING,
    },

    posts: {
      field: "posts",
      type: DataTypes.TEXT,
      get() {
        const list = this.getDataValue("posts");

        if (!list) {
          return [];
        }

        return JSON.parse(list);
      },
      set(value) {
        this.setDataValue("posts", JSON.stringify(value));
      },
    },

    about: {
      field: "about",
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  },
);

const Clients = sequelize.define(
  "clients",
  {
    id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      field: "userId",
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    firstName: {
      field: "firstName",
      type: DataTypes.STRING,
    },
    lastName: {
      field: "lastName",
      type: DataTypes.STRING,
    },
    timezone: {
      field: "timezone",
      type: DataTypes.STRING,
    },
    mobile: {
      field: "mobile",
      type: DataTypes.STRING,
      unique: true,
    },
    birthday: {
      field: "birthday",
      type: DataTypes.STRING,
    },
    imageId: {
      field: "imageId",
      type: DataTypes.STRING,
    },
    imageUrl: {
      field: "imageUrl",
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  },
);

Users.hasOne(Admins, { foreignKey: "userId" });
Users.hasOne(Instructors, { foreignKey: "userId" });
Instructors.hasOne(Users, { foreignKey: "id" });
Users.hasOne(Clients, { foreignKey: "userId" });

module.exports = { Users, Admins, Instructors, Clients };

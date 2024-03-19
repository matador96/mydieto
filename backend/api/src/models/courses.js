const sequelize = require("../core/db");
const { DataTypes } = require("sequelize");
const { statusesOfCourses } = require("../config/statusSettings");
const { Instructors } = require("./users");

const Courses = sequelize.define(
  "courses",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    instructorId: {
      type: DataTypes.INTEGER,
      references: {
        model: "instructors",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },

    duration: {
      type: DataTypes.TEXT,
    },

    tags: {
      field: "tags",
      type: DataTypes.TEXT,
      get() {
        const list = this.getDataValue("tags");

        if (!list) {
          return [];
        }

        return JSON.parse(list);
      },
      set(value) {
        this.setDataValue("tags", JSON.stringify(value));
      },
    },

    price: {
      type: DataTypes.STRING,
    },
    views: {
      type: DataTypes.INTEGER,
    },
    status: {
      field: "status",
      type: DataTypes.ENUM(statusesOfCourses),
    },
  },
  {
    timestamps: true,
  },
);

Courses.belongsTo(Instructors, {
  foreignKey: "instructorId",
});

// Courses.hasOne(Instructors, { foreignKey: "id" });

module.exports = Courses;

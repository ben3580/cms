const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

//TODO: You need to modify this model (or create a new one to suit your needs)
class Course extends Model {
  static async findCourse(courseid) {
    try {
      //TODO: Instead of courseid you may query using something else (may be firstname and lastname)
      const course = await Course.findOne({ where: { courseid: courseid } });
      return course ? course : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

Course.init(
  {
    // DO NOT MODIFY -- I changed the course model and introduced this to help you
    recordid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    //TODO: you need to start changing the fields below to suit your needs
    courseid: {
      type: DataTypes.STRING,
      // REMOVE the 'unique' constraint if your field doesn't need it
      unique: true,
      allowNull: false,
    },
    coursename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coursedesc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    enrollnum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Course",
  }
);

module.exports = Course;

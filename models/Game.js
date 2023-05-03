const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

//TODO: You need to modify this model (or create a new one to suit your needs)
class Game extends Model {
  static async findGame(recordid) {
    try {
      const game = await Game.findByPk(recordid);
      return game ? game : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

Game.init(
  {
    // I changed the course model and introduced this to help you
    // You may leave this record id as is for your solution
    recordid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    //TODO: you need to start changing the fields below to suit your needs
    gamename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gamegenre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gamedesc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    gamerating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    gameprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Game",
  }
);

module.exports = Game;

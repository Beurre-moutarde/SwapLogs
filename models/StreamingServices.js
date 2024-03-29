const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class StreamingServices extends Model {}

StreamingServices.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    stream_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "streamingService",
  }
);

module.exports = StreamingServices;

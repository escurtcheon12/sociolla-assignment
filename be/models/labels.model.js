const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Labels = sequelize.define("labels", {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(30),
      defaultValue: null,
    },
    type: {
      type: DataTypes.ENUM("1", "2"),
      defaultValue: "1",
    },
  });

  return Labels;
};

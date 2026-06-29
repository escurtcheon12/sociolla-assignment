const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Categories = sequelize.define("categories", {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(30),
      defaultValue: null,
    },
  });

  return Categories;
};

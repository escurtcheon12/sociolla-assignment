const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Products = sequelize.define("products", {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(30),
      defaultValue: null,
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      defaultValue: null,
    },
  });

  return Products;
};

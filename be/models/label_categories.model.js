const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const LabelCategories = sequelize.define("label_categories", {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
    },
    label_id: {
      type: DataTypes.INTEGER(11),
      defaultValue: null,
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      defaultValue: null,
    },
  });

  return LabelCategories;
};

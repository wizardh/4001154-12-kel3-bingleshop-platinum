'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orders.belongsTo(models.users, { foreignKey: "user_id" });
      orders.belongsTo(models.items, { foreignKey: "item_id" });
    }
  }
  orders.init({
    user_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    qty: DataTypes.INTEGER,
    total: DataTypes.DOUBLE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};
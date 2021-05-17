const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class UserSub extends Model {}

UserSub.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    subscription_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'subscription',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_sub',
  }
);

module.exports = UserSub;

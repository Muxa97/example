import { DataTypes, Model, Sequelize } from 'sequelize'
import { UserTickerAttributes, UserTickerAttributesCreation } from '../types/user_ticker'

export interface UserTickerInstance
    extends Model<UserTickerAttributes, UserTickerAttributesCreation>,
        UserTickerAttributes {}

function UserTicker (sequelize: Sequelize) {
  return sequelize.define(
    'UserTicker',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tickerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      tableName: 'user_ticker',
      timestamps: false,
      underscored: true,
    },
  )
}

export default UserTicker

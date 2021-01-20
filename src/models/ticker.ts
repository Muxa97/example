import { DataTypes, Model, Sequelize } from 'sequelize'
import { TickerAttributes, TickerCreationAttributes } from '../types/ticker'

export interface TickerInstance
    extends Model<TickerAttributes, TickerCreationAttributes>,
        TickerAttributes {}

function Ticker (sequelize: Sequelize) {
  return sequelize.define<TickerInstance>(
    'Ticker',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ticker: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'tickers',
      timestamps: false,
    },
  )
}

export default Ticker

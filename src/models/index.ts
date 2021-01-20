import { Sequelize } from 'sequelize'
import UserTicker from './user_ticker'
import Ticker from './ticker'

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } = process.env

const sequelize = new Sequelize(
  `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}`,
)

const UserTickerModel = UserTicker(sequelize)
const TickerModel = Ticker(sequelize)

UserTickerModel.belongsTo(TickerModel)
TickerModel.hasMany(UserTickerModel, {
  foreignKey: 'ticker_id',
})

const models = {
  UserTicker: UserTickerModel,
  Ticker: TickerModel,
}

export default models

import { Sequelize } from 'sequelize'
import UserTicker from './user_ticker'
import Ticker from './ticker'

const sequelize = new Sequelize('mysql://root:12345678@localhost:3306/atomic_id_collector')

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

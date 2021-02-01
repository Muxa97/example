import { Sequelize } from 'sequelize'
import User from './user'
import Address from './address'
import Ticker from './ticker'

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } = process.env

const sequelize = new Sequelize(
  `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}`,
  {
    logging: process.env.NODE_ENV !== 'production',
  },
)

sequelize.authenticate().then((res) => console.log(res)).catch((err) => console.log(err))
const UserModel = User(sequelize)
const AddressModel = Address(sequelize)
const TickerModel = Ticker(sequelize)

AddressModel.belongsToMany(UserModel, { through: 'user_address' })
UserModel.belongsToMany(AddressModel, { through: 'user_address' })
AddressModel.belongsTo(TickerModel)
TickerModel.hasMany(AddressModel, {
  foreignKey: 'ticker_id',
})

const models = {
  User: UserModel,
  Address: AddressModel,
  Ticker: TickerModel,
}

export default models

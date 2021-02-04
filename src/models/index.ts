import { Sequelize } from 'sequelize'
import * as config from '../config'
import User from './user'
import Address from './address'
import Ticker from './ticker'
import UserAddress from './user_address'

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB, NODE_ENV } = config
console.log(MYSQL_HOST, MYSQL_PORT, MYSQL_DB)
const sequelize = new Sequelize(
  `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}`,
  {
    logging: NODE_ENV !== 'production',
  },
)

sequelize.authenticate().catch((error) => console.log(error))
const UserModel = User(sequelize)
const AddressModel = Address(sequelize)
const TickerModel = Ticker(sequelize)
const UserAddressModel = UserAddress(sequelize)

AddressModel.belongsToMany(UserModel, { through: UserAddressModel })
UserModel.belongsToMany(AddressModel, { through: UserAddressModel })
AddressModel.belongsTo(TickerModel)
TickerModel.hasMany(AddressModel, {
  foreignKey: 'ticker_id',
})

const models = {
  User: UserModel,
  Address: AddressModel,
  Ticker: TickerModel,
  UserAddress: UserAddressModel,
}

export default models

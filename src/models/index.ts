import { Sequelize } from 'sequelize'
import * as config from '../config'
import { logger } from '../logger'
import User from './user'
import Address from './address'
import Ticker from './ticker'
import UserAddress from './user_address'

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB, NODE_ENV } = config

const sequelize = new Sequelize(
  `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}`,
  {
    logging: NODE_ENV !== 'production',
  },
)

sequelize.authenticate().catch((error) => logger.log({
  level: 'error',
  module: 'models/index sequelize not connected',
  ...error,
}))

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

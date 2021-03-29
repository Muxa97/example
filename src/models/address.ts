import { DataTypes, Model, Sequelize } from 'sequelize'
import { AddressAttributes, AddressCreationAttributes } from '../types/address'

export interface AddressInstance
    extends Model<AddressAttributes, AddressCreationAttributes>,
        AddressAttributes {}

function Address (sequelize: Sequelize) {
  return sequelize.define<AddressInstance>(
    'Address',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tickerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'addresses',
      underscored: true,
    },
  )
}

export default Address

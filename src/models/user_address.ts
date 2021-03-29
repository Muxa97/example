import { DataTypes, Model, Sequelize } from 'sequelize'
import { UserAddressAttributes, UserAddressCreationAttributes } from '../types/user_address'

export interface UserAddressInstance
    extends Model<UserAddressAttributes, UserAddressCreationAttributes>,
        UserAddressAttributes {}

function UserAddress (sequelize: Sequelize) {
  return sequelize.define<UserAddressInstance>(
    'UserAddress',
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
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'user_address',
      timestamps: false,
      underscored: true,
    },
  )
}

export default UserAddress

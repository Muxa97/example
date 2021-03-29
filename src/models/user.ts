import { DataTypes, Model, Sequelize } from 'sequelize'
import { UserAttributes, UserCreationAttributes } from '../types/user'

export interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
        UserAttributes {}

function User (sequelize: Sequelize) {
  return sequelize.define<UserInstance>(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      appVersion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'users',
      underscored: true,
    },
  )
}

export default User

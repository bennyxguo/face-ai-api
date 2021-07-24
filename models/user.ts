import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class User extends Model {
  public id!: number;
  public name: string;
  public email: string;
  public entries: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    entries: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    }
  },
  {
    tableName: 'users',
    sequelize
  }
);

export default User;

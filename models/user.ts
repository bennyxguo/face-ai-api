import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import md5 from 'md5';

class User extends Model {
  public id!: number;
  public name: string;
  public email: string;
  public entries: number;
  public age: string;
  public hobby: string;
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
    },
    age: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    hobby: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    avatar: {
      type: DataTypes.VIRTUAL,
      get() {
        return `https://gravatar.com/avatar/${md5(this.email.toLowerCase())}?s=100&d=robohash&r=x`;
      },
      set(value) {
        throw new Error('Do not try to set the `avatar` value!');
      }
    }
  },
  {
    tableName: 'users',
    sequelize
  }
);

export default User;

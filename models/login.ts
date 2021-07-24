import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class Login extends Model {
  public uid!: number;
  public hash: string;
  public email: string;
}

Login.init(
  {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false
    },
    hash: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: 'logins',
    sequelize
  }
);

export default Login;

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';

class User extends Model {
  public id!: number;
  public dni!: string;
  public bonus_minutes!: number;
  public penalty_minutes!: number;
  public last_rental_date!: Date | null;
  public block_until!: Date | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bonus_minutes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    penalty_minutes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    last_rental_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    block_until: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'User',
    tableName: 'users',
  }
);


export default User;

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';  

class Location extends Model {
  public id!: number;
  public name!: string; 
  public address!: string; 
}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, 
    timestamps: false,
    modelName: 'Location',
    tableName: 'locations',
  }
);

export default Location;

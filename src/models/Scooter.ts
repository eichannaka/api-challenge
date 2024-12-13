import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import Location from './Location';
class Scooter extends Model {
  public id!: number;
  public identifier!: string;
  public is_available!: boolean;
  public location_id!: number;
}

Scooter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Location,
        key: 'id',
      },
      allowNull: false,
    },
    
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'Scooter',
    tableName: 'scooters',
  }
);

Scooter.belongsTo(Location, { foreignKey: 'location_id' });
export default Scooter;

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import User from './User';
import Scooter from './Scooter';

class Rental extends Model {
  public id!: number;
  public user_id!: number;
  public scooter_id !: number;
  public start_time!: Date;
  public end_time!: Date | null;
  public total_minutes!: number;
  public initial_location !: number;  
  public final_location!: number;  
}

Rental.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    total_minutes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    initial_location: { 
      type: DataTypes.INTEGER,
      allowNull: true,  
    },
    final_location: { 
      type: DataTypes.INTEGER,
      allowNull: true,  
    },
    
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'Rental',
    tableName: 'rentals',
  }
);

Rental.belongsTo(User, { foreignKey: 'user_id' });
Rental.belongsTo(Scooter, { foreignKey: 'scooter_id' });

export default Rental;

import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.config';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import scooterRoutes from './routes/scooterRoutes';
import rentalRoutes from './routes/rentalRoutes';

dotenv.config();

const app = express();
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/scooters', scooterRoutes);
app.use('/api/rentals', rentalRoutes);

// Database connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => {
    console.error('Error connecting to database:', err.message);
    process.exit(1); 
  });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

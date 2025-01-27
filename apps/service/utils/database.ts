import { environment } from '../config/environments';
import { initializeModels } from '../models';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  environment.dbName,
  environment.username,
  environment.password,
  {
    dialect: 'mysql',
    host: environment.host,
    logging: environment.loggingDatabase,
    // pool: {
    //   max: 8,
    //   min: 0,
    //   acquire: 30000,
    //   idle: 10000,
    // },
  },
);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    initializeModels(sequelize);
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

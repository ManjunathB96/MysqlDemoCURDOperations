import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
import logger from '../config/logger';

export { DataTypes } from 'sequelize';


let HOST = process.env.HOST;
let PORT = process.env.PORT;
let USERNAME = process.env.USERNAME;
let PASSWORD = process.env.PASSWORD;
let DATABASE = process.env.DATABASE;


const sequelize = new Sequelize('mysqlcurdoperations', 'root', 'M@anju#9@44@9', {
  host: HOST,
  dialect: 'mysql',
  port: PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


sequelize
  .authenticate()
  .then(() => {
    logger.info('Connected to the database.');
  })
  .catch((error) => {
    logger.error('Could not connect to the database.', error);
  });

sequelize.sync();

export default sequelize;
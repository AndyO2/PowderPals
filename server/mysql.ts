import { Sequelize } from 'sequelize';

const username = process.env.MYSQL_USER || '';
const password = process.env.MYSQL_PASS || '';
const host = process.env.MYSQL_HOST || 'localhost';
const port = 3306;
const database = process.env.MYSQL_DB || 'database';
const connection = new Sequelize(database, username, password, {
  host,
  port,
  dialect: 'mysql',
});

async function connectToMySQL() {
  try {
    // TODO: add logic for connecting to different database in different environment
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

async function disconnectMySQL() {
  try {
    await connection.close();
    console.log('Connection has been closed successfully.');
  } catch (error) {
    console.error('Unable to close the database connection:', error);
  }
}

export { connectToMySQL, disconnectMySQL, connection };

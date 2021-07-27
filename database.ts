import { Sequelize } from 'sequelize';

const database: string = String(process.env.MYSQL_DATABASE);
const username: string = String(process.env.MYSQL_USER);
const password: string = String(process.env.MYSQL_PASSWORD);

const db = new Sequelize(database, username, password, {
  host: String(process.env.MYSQL_HOST) || '127.0.0.1',
  port: Number(process.env.MYSQL_LOCAL_PORT) || 3306,
  dialect: 'mysql'
});

(async () => {
  try {
    await db.authenticate();
    console.log('MySQL connection has been established successfully.');
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }
})();

// Open when created a new table
// This will create any table that doesn't exist!
// (async () => {
//   await db.sync();
// })();

export default db;

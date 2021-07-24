import { Sequelize } from 'sequelize';

const database: string = String(process.env.DB_NAME);
const username: string = String(process.env.DB_USERNAME);
const password: string = String(process.env.DB_PASSWORD);

export const db = new Sequelize(database, username, password, {
  host: String(process.env.DB_HOST) || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 8889,
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

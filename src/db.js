const { Database } = require('@jsmrcaga/mongo');
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME } = require('../public/config');

/*
Connect to mongoDB
*/
const myDB = new Database(DB_NAME, {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  endpoint: 'localhost',
  database: 'admin',
  port: 27017,
})

module.exports = myDB

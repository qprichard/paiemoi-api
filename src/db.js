const { Database } = require('@jsmrcaga/mongo');
let config = null;
if(process.env.NODE_ENV == 'production') {
  config = require('../public/config');
} else {
  config = require('../public/config.test');
}
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_ENDPOINT,
  DB_PORT,
} = config;

/*
Connect to mongoDB
*/
let myDB = null;

if( !myDB ) {
  myDB = new Database(DB_NAME, {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    endpoint: DB_ENDPOINT,
    database: DB_NAME,
    port: 27017,
  })
}

module.exports = myDB;

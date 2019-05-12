const indexRouter = require('./routes');
const config = require('../public/config');
const mongoose = require('mongoose');

const app = async() => {
  try {
    await indexRouter.listen(3000);
    indexRouter.log.info(`server listening on ${indexRouter.server.address().port}`)
  } catch(err) {
    indexRouter.log.error(err)
    process.exit(1)
  }
}

//Run api server
app();


/*
Connect to mongoDB
*/
mongoose.connect(`mongodb://localhost/${config.DB_NAME}`, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

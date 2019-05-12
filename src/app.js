const indexRouter = require('./routes');
const db = require('./db')



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

db.connect()
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err))

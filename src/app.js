const indexRouter = require('./routes');
const db = require('./db')



const app = async() => {
  try {
    await db.connect();
    indexRouter.log.info('MongoDB connected...');

    await indexRouter.listen(3000);
    indexRouter.log.info(`server listening on ${indexRouter.server.address().port}`);
  } catch(err) {
    indexRouter.log.error(err)
    process.exit(1)
  }
}

//Run api server
app();

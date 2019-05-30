const User = require('./models');
const UserController = require('./controllers');
const { authTokenMiddleware } = require('../authentication/middlewares');

const userController = new UserController(User);

const router =  [
  {
    method: 'GET',
    url: `/api/users`,
    beforeHandler: [authTokenMiddleware],
    handler: (...args) => userController.all(...args)
  },
  {
    method: 'GET',
    url: `/api/users/:id`,
    beforeHandler: [authTokenMiddleware],
    handler: (...args) => userController.getById(...args)
  },
  {
    method: 'POST',
    url: `/api/users`,
    handler: (...args) => userController.add(...args),
  }
]
module.exports = router;

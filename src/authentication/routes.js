const authController = require('./controllers');
const { authTokenMiddleware } = require('../authentication/middlewares');

const authRouter = [
  {
    method: 'POST',
    url: `/api/authenticate`,
    handler: (...args) => authController.authenticate(...args)
  },
  {
    method: 'GET',
    url: '/api/authorize',
    preHandler: [authTokenMiddleware],
    handler: (...args) => authController.authorize(...args),
  }
]

module.exports = authRouter

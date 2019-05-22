const authController = require('./controllers');

const authRouter = [
  {
    method: 'POST',
    url: `/api/authenticate`,
    handler: (...args) => authController.authenticate(...args)
  },
]

module.exports = authRouter

const User = require('./models');
const ControllerProvider = require('../providers/controllerProvider');

const userController = new ControllerProvider(User);

const routes = [
  {
    method: 'GET',
    url: '/api/users',
    handler: () => userController.all()
  },
  {
    method: 'POST',
    url: '/api/users/many',
    handler: (...args) => userController.get(...args),
  },
  {
    method: 'GET',
    url: '/api/users/:id',
    handler: (...args) => userController.getById(...args)
  },
  {
    method: 'POST',
    url: '/api/users',
    handler: (...args) => userController.add(...args),
  },
  {
    method: 'PATCH',
    url: '/api/users/:id',
    handler: (...args) => userController.update(...args)
  },
  {
    method: 'PATCH',
    url: '/api/users',
    handler: (...args) => userController.update(...args)
  },
  {
    method: 'DELETE',
    url: '/api/users/:id',
    handler: (...args) => userController.delete(...args)
  },
  {
    method: 'DELETE',
    url: '/api/users',
    handler: (...args) => userController.delete(...args)
  }
]

module.exports = routes;

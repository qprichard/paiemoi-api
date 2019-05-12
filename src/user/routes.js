const userController = require('./controllers');

const routes = [
  {
    method: 'GET',
    url: '/api/users',
    handler: userController.getUsers
  },
  {
    method: 'GET',
    url: '/api/users/:id',
    handler: userController.getSingleUser
  },
  {
    method: 'POST',
    url: '/api/users',
    handler: userController.addUser,
  },
  {
    method: 'PUT',
    url: '/api/users/:id',
    handler: userController.updateUser
  },
  {
    method: 'DELETE',
    url: '/api/users/:id',
    handler: userController.deleteUser
  }
]

module.exports = routes;

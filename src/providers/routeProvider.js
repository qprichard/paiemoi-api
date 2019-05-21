const ControllerProvider = require('./controllerProvider');

/**
 * Provide a router with actions on the model provided by the controller
 * @param {string} name - give name to the routes
 * @param {Class} Model - the Model linked to the route
 * @return {array} - Array of routes to use with fastify
*/
const routeProvider = (name, _Model) => {
  const _controller = new ControllerProvider(_Model);

  return [
    {
      method: 'GET',
      url: `/api/${name}`,
      handler: () => userController.all()
    },
    {
      method: 'POST',
      url: `/api/${name}/many`,
      handler: (...args) => userController.get(...args),
    },
    {
      method: 'GET',
      url: `/api/${name}/:id`,
      handler: (...args) => userController.getById(...args)
    },
    {
      method: 'POST',
      url: `/api/${name}`,
      handler: (...args) => userController.add(...args),
    },
    {
      method: 'PATCH',
      url: `/api/${name}/:id`,
      handler: (...args) => userController.update(...args)
    },
    {
      method: 'PATCH',
      url: `/api/${name}`,
      handler: (...args) => userController.update(...args)
    },
    {
      method: 'DELETE',
      url: `/api/${name}/:id`,
      handler: (...args) => userController.delete(...args)
    },
    {
      method: 'DELETE',
      url: `/api/${name}`,
      handler: (...args) => userController.delete(...args)
    }
  ]
}

module.exports = routeProvider;

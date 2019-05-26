const ControllerProvider = require('./controllerProvider');

/**
 * Provide a router with actions on the model provided by the controller
 * @param {string} name - give name to the routes
 * @param {Class} Model - the Model linked to the route
 * @return {array} - Array of routes to use with fastify
*/
const router = (name, _Model, _Controller = ControllerProvider) => {
  const _controller = new _Controller(_Model);

  return [
    {
      method: 'GET',
      url: `/api/${name}`,
      handler: (...args) => _controller.all(...args)
    },
    {
      method: 'POST',
      url: `/api/${name}/many`,
      handler: (...args) => _controller.get(...args),
    },
    {
      method: 'GET',
      url: `/api/${name}/:id`,
      handler: (...args) => _controller.getById(...args)
    },
    {
      method: 'POST',
      url: `/api/${name}`,
      handler: (...args) => _controller.add(...args),
    },
    {
      method: 'PATCH',
      url: `/api/${name}/:id`,
      handler: (...args) => _controller.update(...args)
    },
    {
      method: 'PATCH',
      url: `/api/${name}`,
      handler: (...args) => _controller.update(...args)
    },
    {
      method: 'DELETE',
      url: `/api/${name}/:id`,
      handler: (...args) => _controller.delete(...args)
    },
    {
      method: 'DELETE',
      url: `/api/${name}`,
      handler: (...args) => _controller.delete(...args)
    }
  ]
}

module.exports = router;

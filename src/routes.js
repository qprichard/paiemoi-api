const fastify = require('fastify');
const router = fastify({
  logger: true,
});

const apiRoutes = [
  ...require('./user/routes'),
  ...require('./authentication/routes'),
  ...require('./wallet/routes'),
]

//add api apiRoutes to fastify
apiRoutes.forEach( (route) => {
  router.route(route)
})

module.exports = router;

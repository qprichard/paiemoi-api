const fastify = require('fastify');
const router = fastify({
  logger: true,
});

const apiRoutes = [
  ...require('./user/routes')
]

//Declare a route
router.get('/', async(request, reply) => {
  return { hello: 'world'}
});

//add api apiRoutes to fastify
apiRoutes.forEach( (route) => {
  router.route(route)
})

module.exports = router;

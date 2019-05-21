const User = require('./models');
const routeProvider = require('../providers/routeProvider');

module.exports = routeProvider('names', User);

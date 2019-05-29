const User = require('./models');
const router = require('../providers/router');
const UserController = require('./controllers');

module.exports = router('users', User, UserController);

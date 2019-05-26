const mongoDB = require('../db');
const User  = require('../user/models');

const BasicAuthModel = mongoDB.model('BasicAuth');

class BasicAuth extends BasicAuthModel {
  constructor({
    user,
    token
  }) {
    super();
    this.user = user;
    this.token = token;
  }
}

module.exports = BasicAuth;

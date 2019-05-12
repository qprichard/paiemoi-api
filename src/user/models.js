/* USER Model */
const mongoDB = require('../db');

const UserModel = mongoDB.model('User');

class User extends UserModel {
  constructor({
    username,
    firstname,
    lastname,
    email
  }) {
    super();
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }
}

module.exports = User

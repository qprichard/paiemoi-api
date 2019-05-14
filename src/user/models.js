/* USER Model */
const mongoDB = require('../db');

const UserModel = mongoDB.model('User');

class User extends UserModel {
  constructor({
    username,
    password,
    firstname,
    lastname,
    email
  }) {
    super();
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }
}

module.exports = User;

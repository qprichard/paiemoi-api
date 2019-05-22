/* USER Model */
const mongoDB = require('../db');
const bcrypt = require('bcrypt');

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

  async comparePassword(password){
    try {
      return await bcrypt.compare(password, this.password);
    } catch (err){
      throw new Error(err)
    }
  }
}

module.exports = User;

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
    this.username = username || null;
    this.password = password || null;
    this.firstname = firstname || null;
    this.lastname = lastname || null;
    this.email = email || null;

  }

  /**
   * Compare istance password to a string and check if they match
   * @param {string} password - the password we want to test
   * @returns {Promise} - promise of the comparison
  */
  comparePassword(password) {
    try {
      if(!this.password) {
        throw new Error('Error. Password is missing in props.');
      }

      return bcrypt.compare(password, this.password);
    } catch (err){
      throw new Error(err)
    }
  }

  toAPI() {
    return {
      id: this.id,
      username: this.username,
      lastname: this.lastname,
      firstname: this.firstname,
      email: this.email,
    }
  }
}

module.exports = User;

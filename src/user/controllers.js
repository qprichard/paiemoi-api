/* USER controller */
const User = require('./models');
const bcrypt = require('bcrypt');
const toAPI = require('../helpers/toApi');
const ControllerProvider = require('../providers/controllerProvider');

class UserController extends ControllerProvider {
  constructor(Model){
    super();
    this._Model = Model;

    this.required = [
      'username',
      'email',
      'password',
      'firstname',
      'lastname'
    ]
  }

  async add(req, res) {
    try {
      this.required.forEach(field => {
        if(!req.body[field]) {
          throw new Error(`Missing parameter: ${field}`)
        }
      });

      //hash the password
      const { password, ...rest } = req.body;
      const hash = await bcrypt.hash(password, 10);

      //insert the model
      const model = new this._Model({ password: hash, ...rest });
      return model.save().then((instance) => {
        return instance.toAPI();
      }).catch( err => { throw new Error(err) } );

    } catch (err) {
      return err
    }
  }

  async all() {
    return toAPI(await super.all());
  }

  async getById(...props) {
    return toAPI(await super.getById(...props));
  }
}

module.exports = UserController;

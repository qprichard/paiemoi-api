/* USER controller */
const User = require('./models');
const bcrypt = require('bcrypt');
const toAPI = require('../helpers/toApi');
const ControllerProvider = require('../providers/controllerProvider');
const { badRequest, created } = require('../helpers/httpResponse');

class UserController extends ControllerProvider {
  constructor(Model){
    super();
    this._Model = Model;

    this.required = [
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
          throw badRequest(res, `Missing parameter ${field}`, { required: this.required })
        }
      });

      //hash the password
      const { password, ...rest } = req.body;
      const hash = await bcrypt.hash(password, 10);

      //insert the model
      const model = new this._Model({ password: hash, ...rest });
      return model.save().then((instance) => {
        return created(res, instance.toAPI());
      }).catch( err => { throw err } );

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

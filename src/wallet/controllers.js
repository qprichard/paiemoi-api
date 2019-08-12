const Wallet = require('./models');
const toAPI = require('../helpers/toApi');
const ControllerProvider = require('../providers/controllerProvider');
const { badRequest, created } = require('../helpers/httpResponse');

class WalletController extends ControllerProvider {
  constructor(Model) {
    super();
    this._Model = Model;
    this.required = [
      'name',
    ]
  }

  async add(req, res) {
    try {
      const { user } = req;

      if(!user) {
        throw badRequest('There is no user.');
      }

      this.required.forEach(field => {
        if(!req.body[field]) {
          throw badRequest(res, `Missing parameter ${field}`, { required: this.required });
        }
      });

      const { name, members } = req.body;

      const model = new this._Model({ owner: user, name, members });
      return model.save().then(async (instance) => {
        const wallet = await instance.toAPI();
        return created(res, wallet)
      }).catch( err => { throw err });
    } catch (err) {
      return err;
    }
  }
}

module.exports = WalletController

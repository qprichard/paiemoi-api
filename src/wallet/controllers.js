const Wallet = require('./models');
const toAPI = require('../helpers/toApi');
const ControllerProvider = require('../providers/controllerProvider');
const { badRequest, created, forbidden } = require('../helpers/httpResponse');

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
        throw badRequest(res, 'There is no user.');
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
      }).catch( err => { return err });
    } catch (err) {
      return err;
    }
  }

  async all(req, res) {
    try {
      const { user } = req;
      if(!user) {
        return badRequest(res, 'There is no user.');
      }

      return this._Model.get({"$or" :[{ owner: user }, {members: user }]}).then(
        async (instances) => { return await toAPI(instances )}
      ). catch( err => { return err; });

    } catch (err) {
      return err;
    }
  }

  async getById(req, res) {
    try {
      const { user } = req;
      if(!user) {
        return badRequest(res, 'There is no user.');
      }

      const { id } = req.params;

      //Get the wallet if the user is owner or member
      return this._Model.get({"$or" :[{ owner: user }, {members: user }], id }).then(
        async ([instance]) => {

          //The wallet was not found
          if(!instance) {
            throw forbidden(res, 'Not your wallet.');
          }

          return await instance.toAPI()
        }
      ).catch( err => {return err; })
    } catch (err) {
      return err;
    }
  }
}

module.exports = WalletController

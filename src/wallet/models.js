/* WALLET Model */
const mongoDB = require('../db');

const WalletModel = mongoDB.model('Wallet');
const User = require('../user/models');
const arrayToAPI = require('../helpers/toApi');

class Wallet extends WalletModel {
  constructor({
    name,
    owner,
    members
  }) {
      super();
      this.name = name || null;
      this.owner = owner || null;
      this.members = members || [];
  }

  toAPI() {
    //get The owner Informations by its id
    const ownerPromise = User.get({ id: this.owner }).then(
      ([instance]) => instance.toAPI()
    ).catch( err => err );

    //get the members informations by ids
    const membersPromise = User.get({ id: { $in: this.members }}).then(
      (instances) => arrayToAPI(instances)
    ).catch(err => err );

    //Returns a Promise of owner, members id and name of the wallet
    return Promise.all([ownerPromise, membersPromise]).then((values) => {
      const [owner, members] = values;
      return {
        id: this.id,
        name: this.name,
        owner,
        members,
      }
    }).catch(err => { throw err; } );
  }
}

module.exports = Wallet;

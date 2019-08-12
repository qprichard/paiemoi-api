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
    const ownerPromise = User.get({ id: this.owner });
    const membersPromise = User.get({ id: { $in: this.members }});

    return Promise.all([ownerPromise, membersPromise]).then((values) => {
      const [owner, members] = values;
      return {
        id: this.id,
        name: this.name,
        owner,
        members
      }
    }).catch(err => { console.log('Erreur', err);})
  }
}

module.exports = Wallet;

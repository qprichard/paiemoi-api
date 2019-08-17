const mongoDB = require('../../db');
const expect = require('chai').expect;
const Wallet = require('../models');
const User = require('../../user/models');

describe('Wallet Model', () => {
  before(done => {
    mongoDB.connect()
      .then(() => {done(); })
      .catch((e) => { done(e); })
  });

  afterEach( async() => { await mongoDB.clear() })

  it('should retrieve an instance with default values', () => {
    const wallet = new Wallet({});

    expect(wallet.name).to.equal(null);
    expect(wallet.owner).to.equal(null);
    expect(wallet.members).to.deep.equal([]);
  });

  it('should retrieve a wallet with owner and members informations', async () => {
    const owner = new User({});
    await owner.save();
    const member = new User({});
    await member.save();

    const wallet = new Wallet({ owner: owner.id, members: [member.id], name: "Test"});
    const toAPI = await wallet.toAPI();

    expect(toAPI.owner.id).to.equals(owner.id);
    expect(toAPI.owner).to.have.property('lastname');
    expect(toAPI.owner).to.have.property('firstname');
    expect(toAPI.owner).to.have.property('email');
    expect(toAPI.members[0].id).to.equals(member.id);
    expect(toAPI.members[0]).to.have.property('lastname');
    expect(toAPI.members[0]).to.have.property('firstname');
    expect(toAPI.members[0]).to.have.property('email');
  });
})

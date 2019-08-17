const mongoDB = require('../../db');
const expect = require('chai').expect;
const Wallet = require('../models');
const WalletController = require('../controllers');
const User = require('../../user/models');
const res = require('../../helpers/res');

describe('Wallet Controller', () => {
  before(done => {
    mongoDB.connect()
      .then(() => {done(); })
      .catch((e) => { done(e); })
  });

  afterEach( async() => { await mongoDB.clear() })

  const wc = new WalletController(Wallet);

  describe('Add method', () => {
    it('should create a wallet', async () => {
      const user = await new User({}).save()
      const wallet = await wc.add({user: user.id, body: { 'name': 'Test' }}, res);

      expect(wallet).to.deep.equal({
        id: wallet.id,
        name: 'Test',
        owner: {
          email: null,
          firstname: null,
          id: user.id,
          lastname: null
        },
        members: []
      });
    });

    it('should return no user error', async () => {
      const wallet = await wc.add({}, res);

      expect(wallet).to.deep.equals({
        data: undefined,
        message: 'There is no user.',
        statusCode: 400,
        statusName: "Bad Request error"
      })
    })

    it('should return missing parameter', async () => {
      const user = await new User({}).save()
      const wallet = await wc.add({ user: user.id, body:{} }, res);

      expect(wallet).to.deep.equals({
        data: { required: ['name']},
        message: 'Missing parameter name',
        statusCode: 400,
        statusName: "Bad Request error"
      })
    });
  });

  describe('All method', () => {
    it('should return all wallets', async () => {
      const user = await new User({}).save()
      const wallet = await wc.add({user: user.id, body:{ 'name': 'Test' }}, res);

      const response = await wc.all({user: user.id}, res);

      expect(response).to.deep.equals([wallet])
    });

    it('should return no user error', async () => {
      const wallet = await wc.all({}, res);

      expect(wallet).to.deep.equals({
        data: undefined,
        message: 'There is no user.',
        statusCode: 400,
        statusName: "Bad Request error"
      })
    })
  });

  describe('getById method', () => {
    it('should return an instance', async () => {
      const user = await new User({}).save();
      const wallet = await wc.add({user: user.id, body:{ 'name': 'Test' }}, res);

      const response = await wc.getById({user: user.id, params:{ id: wallet.id }}, res);

      expect(response).to.deep.equal(wallet);
    });

    it('should return no user error', async () => {
      const wallet = await wc.all({}, res);

      expect(wallet).to.deep.equals({
        data: undefined,
        message: 'There is no user.',
        statusCode: 400,
        statusName: "Bad Request error"
      })
    });

    it('should return Not your wallet', async () => {
      const owner = await new User({}).save();
      const user = await new User({}).save();

      const wallet = await wc.add({user: owner.id, body:{ 'name': 'Test' }}, res);

      const response = await wc.getById({user: user.id, params:{ id: wallet.id }}, res);

      expect(response).to.deep.equal({
        statusCode: 403,
        statusName: 'Forbidden error',
        message: 'Not your wallet.',
        data: undefined
      })
    });
  })
})

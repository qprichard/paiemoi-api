const mongoDB = require('../../db');
const expect = require('chai').expect;
const User = require('../../user/models');
const Auth = require('../models');
const authController = require('../controllers');
const bcrypt = require('bcrypt');
const res = require('../../helpers/res');

describe('Authentication Controllers', () => {
  before(done => {
    mongoDB.connect()
      .then(() => done() )
      .catch((err) => done(err))
  })

  afterEach( async () => { await mongoDB.clear() })
  let user = null;
  beforeEach(async () => { 
    user = new User({
      email: 'test',
      password: await bcrypt.hash('test', 10),
    })
    await user.save();
  });

  it('should return Error : "Authentication failed. email and password required"', async () => {
    const response = await authController.authenticate({ body: {} }, res);


    expect(response.message).to.equal('Authentication failed. email and password required')
  });

  it('should return Error : "Authentication failed. User not found"', async () => {
    const response = await authController.authenticate({ body: {
      email: 'test-2',
      password: 'test'
    } }, res);

    expect(response.message).to.equal('Authentication failed. User not found.')
  });

  it('should return Error : "Authentication failed. Wrong password"', async () => {
    const response = await authController.authenticate({ body: {
      email: 'test',
      password: 'test-2'
    } }, res);

    expect(response.message).to.equal('Authentication failed. Wrong password')
  });

  it('should return a token and create an instance in Auth table"', async () => {
    const response = await authController.authenticate({ body: {
      email: 'test',
      password: 'test'
    } }, res);

    const [auth] = await Auth.get({ user: user.id});

    expect(response).to.have.property('token');
    expect(auth.token).to.equal(response.token);
  });

  it('should return a token and update token in Auth table"', async () => {
    const auth = new Auth({ user: user.id, token: 'test'});
    await auth.save();

    let [myAuth] = await Auth.get({ user: user.id });
    expect(myAuth).to.deep.equal(auth);


    const response = await authController.authenticate({ body: {
      email: 'test',
      password: 'test'
    } }, res);

    [myAuth] = await Auth.get({ user: user.id });

    expect(response).to.have.property('token');
    expect(myAuth.user).to.equal(user.id);
    expect(myAuth.token).to.equal(response.token);
  });
});

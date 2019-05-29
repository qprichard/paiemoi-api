const mongoDB = require('../../db');
const expect = require('chai').expect;
const User = require('../../user/models');
const Auth = require('../../authentication/models');
const authController = require('../../authentication/controllers');
const bcrypt = require('bcrypt');

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
      username: 'test',
      password: await bcrypt.hash('test', 10),
    })
    await user.save();
  });

  it('should return Error : "Authentication failed. username and password required"', async () => {
    const response = await authController.authenticate({ body: {} });

    expect(response).to.be.an.instanceOf(Error);
    expect(response.message).to.equal('Authentication failed. username and password required')
  });

  it('should return Error : "Authentication failed. User not found"', async () => {
    const response = await authController.authenticate({ body: {
      username: 'test-2',
      password: 'test'
    } });

    expect(response).to.be.an.instanceOf(Error);
    expect(response.message).to.equal('Authentication failed. User not found.')
  });

  it('should return Error : "Authentication failed. Wrong password"', async () => {
    const response = await authController.authenticate({ body: {
      username: 'test',
      password: 'test-2'
    } });

    expect(response).to.be.an.instanceOf(Error);
    expect(response.message).to.equal('Authentication failed. Wrong password')
  });

  it('should return a token and create an instance in Auth table"', async () => {
    const response = await authController.authenticate({ body: {
      username: 'test',
      password: 'test'
    } });

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
      username: 'test',
      password: 'test'
    } });

    [myAuth] = await Auth.get({ user: user.id });

    expect(response).to.have.property('token');
    expect(myAuth.user).to.equal(user.id);
    expect(myAuth.token).to.equal(response.token);
  });
});

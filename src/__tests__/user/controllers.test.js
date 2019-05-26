const mongoDB = require('../../db');
const expect = require('chai').expect;
const User = require('../../user/models');
const UserController = require('../../user/controllers');
const bcrypt = require('bcrypt');

describe('User Controller', () => {
  before(done => {
    mongoDB.connect()
      .then(() => { done(); })
      .catch(() => { done(); })
  });

  afterEach( async () => { await mongoDB.clear() })

  const uc = new UserController(User);

  it('should save a new user with hash password', async () => {
    const user = await uc.add({ body: {
      username: 'test',
      password: 'test',
      email: 'test',
      firstname: 'test',
      lastname: 'test',
    }})

    const [myUser] = await uc.all();
    const compare = await myUser.comparePassword('test');

    expect(myUser).to.deep.equal(user);
    expect(compare).to.equal(true)
  });

  it('should throw a missing parameters Error', async () => {
    const response = await uc.add({ body: {}})

    expect(response).to.be.an.instanceOf(Error)
    expect(response.message).to.equals('Missing parameter: username')
  });
})

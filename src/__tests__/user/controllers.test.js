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

    expect(user).to.deep.equal({
      email: 'test',
      lastname: 'test',
      firstname: 'test',
      username: 'test',
      id: user.id
    });
  });

  it('should throw a missing parameters Error', async () => {
    const response = await uc.add({ body: {}})

    expect(response).to.be.an.instanceOf(Error)
    expect(response.message).to.equals('Missing parameter: username')
  });

  it('should retrieve all instances of user formated to API', async () => {
    await uc.add({ body: {
      username: 'test',
      password: 'test',
      email: 'test',
      firstname: 'test',
      lastname: 'test',
    }})

    await uc.add({ body: {
      username: 'test2',
      password: 'test2',
      email: 'test2',
      firstname: 'test2',
      lastname: 'test2',
    }})

    const response = await uc.all();

    expect(response).to.have.length(2)
    expect(response[0]).to.have.property('username');
    expect(response[0]).to.have.property('lastname');
    expect(response[0]).to.have.property('id');
    expect(response[0]).to.have.property('firstname');
    expect(response[0]).to.have.property('email');
    expect(response[0]).not.to.have.property('password');
  });
})

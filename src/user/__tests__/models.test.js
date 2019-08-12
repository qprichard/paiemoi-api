const mongoDB = require('../../db');
const expect = require('chai').expect;
const User = require('../models');
const bcrypt = require('bcrypt');

describe('User Model', () => {
  before(done => {
    mongoDB.connect()
      .then(() => { done(); })
      .catch((e) => { done(e); })
  });

  afterEach( async() => { await mongoDB.clear() })

  let user = null;
  beforeEach(() => user = new User({}));
  it('should retrieve an instance with null values', () => {
    expect(user.username).to.equal(null);
    expect(user.password).to.equal(null);
    expect(user.firstname).to.equal(null);
    expect(user.lastname).to.equal(null);
    expect(user.email).to.equal(null);
  });

  it('should throw "Error. Password is missing in props."', () => {
    expect(() => user.comparePassword('test')).to.throw('Error. Password is missing in props.')
  });

  it('should return false to comparison', async () => {
    user.password = 'Test';

    const result = await user.comparePassword('Test');

    expect(result).to.equal(false);
  });

  it('should return true to comparison', async () => {
    user.password = await bcrypt.hash('Test', 10);

    const result = await user.comparePassword('Test')

    expect(result).to.equal(true);
  });
})

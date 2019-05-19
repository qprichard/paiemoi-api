const expect = require('chai').expect;
const db = require('../db');

describe('Test db initialisation', () => {
  it('Should have been instancied with default values', () => {
    expect(db.name).to.equal('paiemoi_test');
    expect(db.options).to.deep.equal({
      username: "user_test",
      password: "password_test",
      endpoint: "localhost",
      database: "paiemoi_test",
      port: 27017,
    })
  })
});

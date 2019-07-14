const expect = require('chai').expect;
const httpResponse = require('../httpResponse');

describe('Test httpResponse methods', () => {
  describe('Errors', () => {
    it('badRequest',  () => {
      const response = httpResponse.badRequest('this is a bad request');

      expect(response).to.be.instanceOf(Error);
      expect(response.status).to.equal(400);
      expect(response.name).to.equal('Bad Request error');
      expect(response.message).to.equal('this is a bad request');
    });

    it('unauthorized',  () => {
      const response = httpResponse.unauthorized('you are unauthorized');

      expect(response).to.be.instanceOf(Error);
      expect(response.status).to.equal(401);
      expect(response.name).to.equal('Unauthorized error');
      expect(response.message).to.equal('you are unauthorized');
    });

    it('forbidden',  () => {
      const response = httpResponse.forbidden('forbidden');

      expect(response).to.be.instanceOf(Error);
      expect(response.status).to.equal(403);
      expect(response.name).to.equal('Forbidden error');
      expect(response.message).to.equal('forbidden');
    });

    it('notFound',  () => {
      const response = httpResponse.notFound('not found');

      expect(response).to.be.instanceOf(Error);
      expect(response.status).to.equal(404);
      expect(response.name).to.equal('Not Found error');
      expect(response.message).to.equal('not found');
    });
  });

  describe('Success', () => {
    it('ok',  () => {
      const response = httpResponse.ok('ok');

      expect(response.status).to.equal(200);
      expect(response.name).to.equal('OK ');
      expect(response.message).to.equal('ok');
    });

    it('created',  () => {
      const response = httpResponse.created('created');

      expect(response.status).to.equal(201);
      expect(response.name).to.equal('Created ');
      expect(response.message).to.equal('created');
    });
  });
});

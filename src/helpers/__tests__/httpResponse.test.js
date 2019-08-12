const expect = require('chai').expect;
const httpResponse = require('../httpResponse');
const res = require('../res');

describe('Test httpResponse methods', () => {
  describe('Errors', () => {
    it('badRequest',  () => {
      const response = httpResponse.badRequest(res, 'this is a bad request');

      expect(response.statusCode).to.equal(400);
      expect(response.statusName).to.equal('Bad Request error');
      expect(response.message).to.equal('this is a bad request');
    });

    it('unauthorized',  () => {
      const response = httpResponse.unauthorized(res, 'you are unauthorized');

      expect(response.statusCode).to.equal(401);
      expect(response.statusName).to.equal('Unauthorized error');
      expect(response.message).to.equal('you are unauthorized');
    });

    it('forbidden',  () => {
      const response = httpResponse.forbidden(res, 'forbidden');

      expect(response.statusCode).to.equal(403);
      expect(response.statusName).to.equal('Forbidden error');
      expect(response.message).to.equal('forbidden');
    });

    it('notFound',  () => {
      const response = httpResponse.notFound(res, 'not found');

      expect(response.statusCode).to.equal(404);
      expect(response.statusName).to.equal('Not Found error');
      expect(response.message).to.equal('not found');
    });
  });

  describe('Success', () => {
    it('ok',  () => {
      const response = httpResponse.ok(res, 'ok');

      expect(response).to.equal('ok');
    });

    it('created',  () => {
      const response = httpResponse.created(res, 'created');

      expect(response).to.equal("created");
    });
  });
});

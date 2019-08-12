const mongoDB = require('../../db');
const expect = require('chai').expect;
const router = require('../router');

describe('Route Provider for mongoDB with personnal ControllerProvider', () => {
  const Test = mongoDB.model('Test');

  const testRouter = router('tests', Test);

  it('should render an array of object', () => {
    expect(testRouter).to.be.an('array');
    testRouter.forEach(route => expect(route).to.be.an('object'));
  });


  it('methods should match array', () => {
    const methods = [
      'GET',
      'POST',
      'GET',
      'POST',
      'PATCH',
      'PATCH',
      'DELETE',
      'DELETE'
    ];

    const urls = [
      '/api/tests',
      '/api/tests/many',
      '/api/tests/:id',
      '/api/tests',
      '/api/tests/:id',
      '/api/tests',
      '/api/tests/:id',
      '/api/tests',
    ]
    testRouter.forEach( (route, index) => {
      describe(`route ${index}`, () => {
        it(`should have method ${methods[index]}`, () => {
          expect(route['method']).to.equal(methods[index]);
        });

        it(`should have url ${urls[index]}`, () => {
          expect(route['url']).to.equal(urls[index]);
        });

        it(`handler should be a function`, () => {
          expect(route['handler']).to.be.a('function');
        });
      });
    })
  })
});

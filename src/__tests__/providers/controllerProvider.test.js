const mongoDB = require('../../db');
const expect = require('chai').expect;
const ControllerProvider = require('../../providers/controllerProvider');

describe('Controller Provider for mongo models', () => {
  const TestModel = mongoDB.model('Test');

  class Test extends TestModel {
    constructor({
      param1,
      param2
    }) {
      super();
      this.param1 = param1 || null;
      this.param2 = param2 || null;
    }
  }

  const testController = new ControllerProvider(Test);

  before(done => {
    mongoDB.connect()
      .then(() => { done(); })
      .catch((e) => { done(e); })
  });

  afterEach( async() => { await mongoDB.clear()} )
  it('should be instanciated with model', () => {
    expect(testController).to.have.property('_Model');
    expect(testController._Model).to.equal(Test);
  });

  it('should retrieve all instances created', async() => {
    const instance1 = new Test({});
    await instance1.save();

    expect(await testController.all()).to.deep.equal([ instance1 ]);
  });

  describe('Test Getters', () => {
    const instance1 = new Test({});
    const instance2 = new Test({});

    it('should retrieve an instance by id', async () => {
      instance1.id = "1";
      await instance1.save();
      await instance2.save();
      expect(await testController.getById({ params: { id:"1"}})).to.deep.equal([ instance1 ]);
    });

    it('should retrieve an all instance because there is no id in params', async () => {
      instance1.id = "1";
      await instance1.save();
      await instance2.save();
      expect(await testController.getById({ params: {}})).to.deep.equal([ instance1, instance2 ]);
    });

    it('should retrieve an empty array', async () => {
      instance1.id = "1";
      await instance1.save();
      await instance2.save();
      expect(await testController.getById({ params: { id: "3" }})).to.deep.equal([]);
    });

    it('should retrieve all instances having property we want', async () => {
      instance1.param1 = "1";
      instance2.param1 = "1";
      instance1.param2 = "2";
      instance2.param2 = "3";
      await instance1.save();
      await instance2.save();

      expect(await testController.get({ body: { param1: "1" } })).to.deep.equal([ instance1, instance2 ]);
      expect(await testController.get({ body: { param2: "2" } })).to.deep.equal([ instance1 ]);
      expect(await testController.get({ body: { param1: "2" } })).to.deep.equal([]);
      expect(await testController.get({ body: {} })).to.deep.equal([instance1, instance2]);
    });
  });

  describe('Test Create', () => {
    it('should create a unique instance and retrieve it', async () => {
      const body = {
        param1: "1",
        param2: "1"
      };
      const instance = await testController.add({ body });

      expect(instance.param1).to.equal('1');
      expect(instance.param2).to.equal('1');
      expect(instance).to.be.an.instanceof(Test);
    });

    it('should create all instances for each object in body and retrives them', async () => {
      const body = {
        instances: [
          { param1: "1", param2: "1" },
          { param1: "1", param2: "1" },
        ]
      };

      const instances = await testController.add({ body });
      expect(instances).to.have.property('result');
      expect(instances).to.have.property('ops');
      expect(instances).to.have.property('insertedCount');
      expect(instances).to.have.property('insertedIds');

      expect(instances['result']).to.deep.equal({ ok: 1, n:2 });
      expect(instances['ops']).to.be.an('array');
      expect(instances['insertedCount']).to.equal(2);
      expect(instances['insertedIds']).to.be.an('object');
    });
  });

  describe('Test update method', () => {
    const instance1 = new Test({ param1: "1", param2: "1"});
    const instance2 = new Test({ param1: "2", param2: "2"});

    it('should update the instance by its id in url', async () => {
      instance1.id = "1";
      await instance1.save();

      const req = {
        params: {
          id: "1"
        },
        body: {
          param1: "test",
          param2: "test"
        }
      }

      const updated = await testController.update(req);

      expect(updated[0].param1).to.equal('test');
      expect(updated[0].param2).to.equal('test');
      expect(updated[0]).to.be.an.instanceof(Test);
    });

    it('should update instances passed in body', async () => {
      instance1.id = "1";
      instance2.id = "2";
      await instance1.save();
      await instance2.save();

      const req = {
        params: {},
        body: {
          instances: [
            { id: "1", param1:"test"},
            { id: "2", param1:"test-2"},
            { id: "3", param1:"test-3"},
          ]
        }
      }

      const updated = await testController.update(req);

      expect(updated).to.have.length(2);
      expect(updated[0]['param1']).to.equal("test");
      expect(updated[1]['param1']).to.equal("test-2");
    });

    it('should throw an error without instances and id', async () => {
      instance1.id = "1";
      instance2.id = "2";
      await instance1.save();
      await instance2.save();

      const req = {
        params: {},
        body: {}
      }

      const updated = testController.update(req).catch(
        (err) => {
          expect(err).to.be.an.instanceof(Error);
        }
      )
    });
  });

  describe("Test Delete method", () => {
    const instance1 = new Test({});
    const instance2 = new Test({});

    it('should delete the instance passed in url', async () => {
      instance1.id = "1";
      await instance1.save();

      const deleted = await testController.delete({ params: { id: "1" }});
      expect(deleted.result).to.deep.equal({ n: 1, ok: 1 });
    });

    it('should delete all the instances passed in body', async () => {
      instance1.id = "1";
      instance2.id = "2";
      await instance1.save();
      await instance2.save();

      const deleted = await testController.delete({ params: {}, body: { instances: ["1", "2"]}});
      expect(deleted.result).to.deep.equal({ n: 2, ok: 1 });
    });

    it('should throw an error if there is no data', async () => {
      instance1.id = "1";
      await instance1.save();

      const deleted = testController.delete({ params: {}, body: {}}).catch((err) => {
        expect(err).to.be.an.instanceof(Error);
      });
    });
  });
});

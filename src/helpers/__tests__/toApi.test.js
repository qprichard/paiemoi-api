const toAPI = require('../toApi');
const expect = require('chai').expect;

describe('Test helper toAPI', () => {
  class Test {
    constructor({
      param1,
      param2,
    }) {
      this.param1 = param1
      this.param2 = param2
    }
  }

  class TestAPI{
    constructor({
      param1,
      param2
    }){
      this.param1 = param1;
      this.param2 = param2;
    }

    toAPI() {
      return {
        param1: this.param1
      }
    }
  }

  it('should retrieve the incoming single data', async () => {
    const myData = new Test({ param1: 'test', param2: 'test' });

    expect(await toAPI(myData)).to.deep.equal({
      param1: 'test',
      param2: 'test'
    });
  });

  it('should retrieve formated single data', async () => {
    const myData = new TestAPI({ param1: 'test', param2: 'test' });

    expect(await toAPI(myData)).to.deep.equal({
      param1: 'test',
    });
  });

  it('should retrieve multiple incoming datas', async () => {
    const myDatas = [
      new Test({ param1: 'test-1', param2: 'test-1'}),
      new Test({ param1: 'test-2', param2: 'test-2'}),
    ]

    expect(await toAPI(myDatas)).to.deep.equals([
      {
        param1: 'test-1',
        param2: 'test-1',
      },
      {
        param1: 'test-2',
        param2: 'test-2',
      },
    ])
  });

  it('should retrieve multiple formated datas', async () => {
    const myDatas = [
      new TestAPI({ param1: 'test-1', param2: 'test-1'}),
      new TestAPI({ param1: 'test-2', param2: 'test-2'}),
    ]

    expect(await toAPI(myDatas)).to.deep.equals([
      {
        param1: 'test-1',
      },
      {
        param1: 'test-2',
      },
    ])
  });
});

/**
* this is a hack to test components using express
**/
const res =  {
  status: (code) => { return code; },
  send: (data) => { return data; }
}

module.exports = res;

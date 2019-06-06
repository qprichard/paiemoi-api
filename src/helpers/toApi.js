/**
 * Returns data formated to json
 * data is returned to API type if model has 'toAPI' method
 * @param {(object | array)} data - instance of a class
 * @returns {object} - return json object;
*/
const toAPI = (data) => {
  if( Array.isArray(data)) {
    return data.map( instance => {
      if( typeof instance['toAPI'] === 'function') {
        return instance.toAPI();
      }
      return instance;
    })
  }

  if( data.ops ) {
    return toAPI(data.ops);
  }

  if(typeof data['toAPI'] === 'function') {
    return data.toAPI();
  }

  return data;
}

module.exports = toAPI

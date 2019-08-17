/**
 * Returns Promise of data formated to json
 * data is returned to API type if model has 'toAPI' method
 * @param {(object | array)} data - instance of a class
 * @returns {object} - return json object;
*/
const toAPI = (data) => {
  if( Array.isArray(data)) {
    const promises = data.map( async instance => {
      if( typeof instance['toAPI'] === 'function') {
        return instance.toAPI();
      }
      return instance;
    });

    return Promise.all(promises).then( (values) => values ).catch((err) => err)
  }

  if(typeof data['toAPI'] === 'function') {
    return data.toAPI()
  }

  return data;
}

module.exports = toAPI

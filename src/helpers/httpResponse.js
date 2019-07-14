const { STATUS_CODES } = require('http');

class HTTPError extends Error {
  constructor(code, message, extras) {
    super(message || STATUS_CODES[code]);
    if(arguments.length >= 3 && extras) {
      Object.assign(this, extras);
    }

    this.name = toName(code);
    this.status = code;
  }
}

class HTTPSuccess {
  constructor(code, message, extras) {
    this._extras = extras;
    this._message = message;
    this._name = toName(code);
    this._status = code;
  }

  response() {
    return {
      status: this._status,
      name: this._name,
      message: this._message,
      body: this._extras,
    }
  }
}

function toName (code) {
  const suffix = (code / 100 | 0) === 4 || (code / 100 | 0) === 5 ? 'error' : '';
  return `${String(STATUS_CODES[code]).replace(/error$/i, '')} ${suffix}`;
}

/**
 * Return a bad request error
 * @param {string} message - Message
 * @param {object} extras - informations
 * @returns {object}
**/
function badRequest(message, extras={}) {
  return new HTTPError(400, message, extras);
}

/**
 * Return a unauthorized error
 * @param {string} message - Message
 * @param {object} extras - informations
 * @returns {object}
**/
function unauthorized(message, extras={}) {
  return new HTTPError(401, message, extras);
}

function forbidden(message, extras={}) {
  return new HTTPError(403, message, extras);
}

function notFound(message, extras={}) {
  return new HTTPError(404, message, extras);
}

function ok(message, extras={}) {
  const response = new HTTPSuccess(200, message, extras);
  return response.response();
}

function created(message, extras={}) {
  const response = new HTTPSuccess(201, message, extras);
  return response.response();
}

module.exports = {
  //errors
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  //success
  ok,
  created,
  //other
  toName,

}

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
  return new HTTPError(200, message, extras);
}

function created(message, extras={}) {
  return new HTTPError(201, message, extras);
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

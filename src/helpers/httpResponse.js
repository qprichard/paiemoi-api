const { STATUS_CODES } = require('http');

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
function badRequest(res, message, extras) {
  res.status(400);
  return res.send({
    statusCode: 400,
    statusName: toName(400),
    message,
    data: extras,
  })
}

/**
 * Return a unauthorized error
 * @param {string} message - Message
 * @param {object} extras - informations
 * @returns {object}
**/
function unauthorized(res, message, extras) {
  res.status(401);
  return res.send({
    statusCode: 401,
    statusName: toName(401),
    message,
    data: extras
  })
}

function forbidden(res, message, extras) {
  res.status(403);
  return res.send({
    statusCode: 403,
    statusName: toName(403),
    message,
    data: extras
  });
}

function notFound(res, message, extras) {
  res.status(404);
  return res.send({
    statusCode: 404,
    statusName: toName(404),
    message,
    data: extras,
  })
}

function ok(res, data) {
  res.status(200);
  return res.send(data)
}

function created(res, data) {
  res.status(201);
  return res.send(data);
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

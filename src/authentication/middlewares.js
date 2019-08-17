const BasicAuth = require('./models');
const jwt = require('jsonwebtoken');
let config = null;
if(process.env.NODE_ENV == 'production') {
  config = require('../../public/config');
} else {
  config = require('../../public/config.test');
}
const { TOKEN_SIGNATURE } = config;
const {badRequest, unauthorized } = require('../helpers/httpResponse');

exports.authTokenMiddleware = (req, res, next) => {
  try{
    //check for token
    const token = req.query.token || (req.body && req.body.token) || req.headers['authorization'];

    //decode token
    if (token) {
      jwt.verify(token, TOKEN_SIGNATURE, (err, decoded) => {
        if(err) {
          throw badRequest(res, err);
        } else {

          //check existance of that token in our database
          //to avoid fakes one
          BasicAuth.get({ token }).then(([auth]) => {

            //give userID and decoded token to req
            //for routes
            req.user = auth.user;
            req.decoded = decoded;
            next();
          }).catch((err) => { throw badRequest(res, err) })
        }
      });
    } else {
      throw unauthorized(res, 'no token provided');
    }

  } catch (err) {
    res.status(403).send({
      success: false,
      message: err
    })
  }
}

const User = require('../user/models');
const BasicAuth = require('./models');
const jwt = require('jsonwebtoken');
let config = null;
if(process.env.NODE_ENV == 'production') {
  config = require('../../public/config');
} else {
  config = require('../../public/config.test');
}
const toAPI = require('../helpers/toApi');
const { TOKEN_SIGNATURE } = config;
const { badRequest, forbidden, ok } = require('../helpers/httpResponse');


/**
  * If user is already in auth table, update its token, else, create the instance
  * @param {string} userID - ID of the user
  * @returns {class} - Return an intance of the Auth
*/
const _updateOrCreate = (userID, token) => {
  try {
    return BasicAuth.get({ user: userID }).then(([instance]) => {
      if(!instance) {
        const auth = new BasicAuth({ user: userID, token: token });
        return auth.save();
      }
      instance.token = token;
      return instance.save();

    }). catch((err) => { throw new Error(err) } )
  } catch (err) {
    throw new Error(err);
  }
}

exports.authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      throw badRequest(res, 'Authentication failed. email and password required');
    }

    const [user] = await User.get({ email });

    if(!user) {
      throw forbidden(res, 'Authentication failed. User not found.');
    }

    //check if password and hash match
    const passwordMatch = await user.comparePassword(password);
    if(!passwordMatch) {
      throw forbidden(res, 'Authentication failed. Wrong password');
    }


    const payload = {
      id: user.id,
      email: email.username,
    };

    const token  = jwt.sign(payload, TOKEN_SIGNATURE, {
      expiresIn: 1440
    });

    await _updateOrCreate(user.id, token);

    return user.toAPI().then( value => {
      return ok(res, { token, user: value })
    }).catch( err => { throw err; })
  } catch (err) {
    return err;
  }
}

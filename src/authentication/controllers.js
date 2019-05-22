const boom = require('boom');
const User = require('../user/models');
const jwt = require('jsonwebtoken');
let config = null;
if(process.env.NODE_ENV == 'production') {
  config = require('../../public/config');
} else {
  config = require('../../public/config.test');
}
const { TOKEN_SIGNATURE } = config;


exports.authenticate = async (req) => {
  try {
    const { username, password } = req.body;
    if(!username || !password) {
      throw new Error('Authentication failed. username and password required');
    }

    const user = await User.get({ username });

    if(!user || !user.length) {
      throw new Error('Authentication failed. User not found.');
    }

    console.log(user)
    //check if password matches
    if(!user.comparePassword(password)) {
      throw new Error('Authentication failed. Wrong password');
    }

    const payload = {
      username: user.username,
    };

    const token  = jwt.sign(payload, TOKEN_SIGNATURE, {
      expiresInMinutes: 1440
    });
    return { token, message: "token provided" }
  } catch (err) {
    throw boom.boomify(err);
  }
}

/* USER controller */

const boom = require('boom');
const User = require('./models');

//get all users
exports.getUsers = async (req, reply) => {
  try {
    const users = await User.all()
    return users;
  } catch (err) {
    throw boom.boomify(err);
  }
}

//get a single user
exports.getSingleUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = await User.get({ id })
    return user;
  } catch (err) {
    throw boom.boomify(err);
  }
}

//Add a new user
exports.addUser = async (req, reply) => {
  try {
    const user = new User(req.body);
    return user.save()
  } catch (err) {
    throw boom.boomify(err);
  }
}

//Update an existing user
exports.updateUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = req.body
    const { ...updateData } = user
    const update = await User.findById(id)
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

//Delete a User
exports.deleteUser = async (req, reply) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);
    return user;
  } catch (err) {
    throw boom.boomify(err)
  }
}

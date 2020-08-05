const db = require('../models');

// find all users
exports.findAllUsers = (params) => db.users.findAll(params);

// create new user
exports.createUser = (values) => db.users.create(values);

// search for user with given id
exports.findUser = (values) => db.users.findOne(values);

// find user by email
exports.findUserByEmail = (params) => db.users.findOne(params);

// update user
exports.updateUser = (values, option) => db.users.update(values, option);

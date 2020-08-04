const db = require('../models');

// megtalalja az osszes felhasznalot
exports.findAllUsers = (params) => db.users.findAll(params);

// keszit egy uj felhasznalot
exports.createUser = (values) => db.users.create(values);

// megkeres egy felhasznalot id alapjan
exports.findUser = (values) => db.users.findOne(values);

// megkeres egy felhasznalot email alapjan
exports.findUserByEmail = (params) => db.users.findOne(params);

// frissit egy felhasznalot
exports.updateUser = (values, option) => db.users.update(values, option);

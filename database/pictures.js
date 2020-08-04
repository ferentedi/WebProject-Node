const db = require('../models');

exports.createPicture = (picture) => db.pictures.create(picture);
exports.findPicture = (values) => db.pictures.findOne(values);

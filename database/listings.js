const db = require('../models');

exports.findAllListings = (params) => db.listings.findAll(params);
exports.findListing = (values) => db.listings.findOne(values);
exports.createListing = (values) => db.listings.create(values);
exports.updateListing = (values, option) => db.listings.update(values, option);

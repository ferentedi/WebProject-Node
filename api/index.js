const express = require('express');

const listings = require('./listings');
const pictures = require('./pictures');
const users = require('./users');

const router = express.Router();

router.use('/listings', listings);
router.use('/pictures', pictures);
router.use('/users', users);

module.exports = router;

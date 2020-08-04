const express = require('express');

const details = require('./details');
const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const listings = require('./listings');
const pictures = require('./pictures');

const router = express.Router();

router.use('/', login);
router.use('/logout', logout);
router.use('/signup', signup);
router.use('/details', details);
router.use('/listings', listings);
router.use('/pictures', pictures);

module.exports = router;

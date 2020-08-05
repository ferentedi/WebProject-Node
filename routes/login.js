const express = require('express');
const userDao = require('../database/users');
const listingsDao = require('../database/listings');

const router = express.Router();
const db = require('../models');

const carMakeData = require('../data/carMakeData');

const utils = require('../utils/utils');
const macros = require('../utils/macros');

// this is the main page endpoint
router.get('/', (req, res) => {
  res.render('login');
});

// login
// if successful then display the list of listings from database
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const expectedUser = await userDao.findUser({ where: { email } });
    if (expectedUser !== null && utils.checkPassword(expectedUser.passwordWithSalt, password)) {
      const jwtToken = utils.generateJwtToken({
        userEmail: email,
        userId: expectedUser.id,
        userName: expectedUser.fullname,
        userRole: expectedUser.role,
      });
      res.cookie(macros.JWT_COOKIE_TOKEN, jwtToken);
      const listings = await listingsDao.findAllListings({
        include: [{
          model: db.pictures,
        }],
      });
      const loggedInUserName = expectedUser.fullname;
      const loggedInUserId = res.locals.userId;
      res.render('listAll', {
        listings, carMakeData, loggedInUserName, loggedInUserId,
      });
    } else {
      res.status(401);
      res.render('error', { error: 'Wrong credentials' });
    }
  }
});

module.exports = router;

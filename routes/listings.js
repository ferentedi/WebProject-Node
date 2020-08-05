const express = require('express');
const Sequelize = require('sequelize');
const listingsDao = require('../database/listings');
const userDao = require('../database/users');

const router = express.Router();

const carMakeData = require('../data/carMakeData');

const { Op } = Sequelize;

const macros = require('../utils/macros');

const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

// admin only
// read
router.get('/', [authenticationMiddleware(),
  authorizationMiddleware([macros.ADMIN_ROLE])], (req, res) => {
  const loggedInUserName = res.locals.userName;
  const loggedInUserId = res.locals.userId;
  res.render('newListing', { carMakeData, loggedInUserName, loggedInUserId });
});

// admin only
// create
router.post('/', [authenticationMiddleware(),
  authorizationMiddleware([macros.ADMIN_ROLE])], async (req, res) => {
  const {
    make, model, fuel,
    shifter, power, manufactDate,
    miles, type, doorNr,
    color, city, price,
  } = req.body;
  const loggedInUserEmail = res.locals.userEmail;
  const loggedInUserName = res.locals.userName;
  const loggedInUser = await userDao.findUser({ where: { email: loggedInUserEmail } });
  // eslint-disable-next-line no-restricted-syntax
  for (const [, value] of Object.entries(req.body)) {
    if (!value) {
      res.status(422);
      res.send('Invalid input.');
    }
  }
  await listingsDao.createListing({
    make,
    model,
    fuel,
    shifter,
    power,
    manufactDate,
    miles,
    type,
    doorNr,
    color,
    city,
    price,
    userId: loggedInUser.id,
  })
    .catch(() => res.render('error', { error: 'Error when creating listing.' }));
  const listings = await listingsDao.findAllListings({});
  const loggedInUserId = loggedInUser.id;
  res.render('listAll', {
    listings, carMakeData, loggedInUserName, loggedInUserId,
  });
});

// every logged in user can see this endpoint
// searches with given criteria
router.post('/find', [authenticationMiddleware(),
  authorizationMiddleware([macros.ADMIN_ROLE, macros.USER_ROLE])], async (req, res) => {
  const {
    make, city, minPrice, maxPrice,
  } = req.body;
  const loggedInUserName = res.locals.userName;
  const listings = await listingsDao.findAllListings({
    where: { make, city, price: { [Op.lte]: maxPrice, [Op.gte]: minPrice } },
  });
  const loggedInUserId = res.locals.userId;
  res.render('listAll', {
    listings, carMakeData, loggedInUserName, loggedInUserId,
  });
});

module.exports = router;

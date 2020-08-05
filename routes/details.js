const express = require('express');
const listingsDao = require('../database/listings');

const router = express.Router();
const db = require('../models');

const macros = require('../utils/macros');

const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

// only admin role can access this endpoint
router.get('/:id', [authenticationMiddleware(),
  authorizationMiddleware([macros.ADMIN_ROLE])], async (req, res) => {
  const { id } = req.params;
  const loggedInUserName = res.locals.userName;
  const listing = await listingsDao.findAllListings({
    where: { id },
    include: [{
      model: db.pictures,
    }],
  });
  const loggedInUserId = res.locals.userId;
  res.render('details', { listing: listing[0], loggedInUserName, loggedInUserId });
});

module.exports = router;

const express = require('express');
const listingsDao = require('../database/listings');

const router = express.Router();

const macros = require('../utils/macros');

const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

// returns a listing
router.get('/:id', [authenticationMiddleware(),
  authorizationMiddleware([macros.ADMIN_ROLE, macros.USER_ROLE])], async (req, res) => {
  const itemToFindId = req.params.id;
  const listing = await listingsDao.findListing({
    where: { id: itemToFindId  },
  });
  if (listing) {
    res.status(200).json(listing);
  }
  res.status(404).json({ error: 'Resource not found.' });
});

module.exports = router;

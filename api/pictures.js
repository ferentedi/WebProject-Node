const express = require('express');
const listingsDao = require('../database/listings');
const pictureDao = require('../database/pictures');

const router = express.Router();

const macros = require('../utils/macros');

const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

// delete a picture from a listing
router.delete('/:id', [authenticationMiddleware(),
  authorizationMiddleware([macros.ADMIN_ROLE, macros.USER_ROLE])], async (req, res) => {
  const pictureId = req.params.id;
  // look for the picture in the database
  const foundPicture = await pictureDao.findPicture({
    where: { id: pictureId },
  });
  // if there is a picture with this id
  if (foundPicture) {
    // search for the listing that it belongs to
    const listing = await listingsDao.findListing({
      where: { pictureId: foundPicture.id },
    });
    // if there is such a listing
    if (listing) {
      // if the logged in user is the creator of given listing
      const loggedInUserId = res.locals.userId;
      if (loggedInUserId === listing.userId) {
        foundPicture.destroy();
      } else {
        res.status(403).json({ error: 'You do not have authorization to delete this photo.' });
      }
      // update the listing
      try {
        await listingsDao.updateListing({ pictureId: null }, { where: { id: listing.id } });
        res.status(204);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(404).json({ error: 'Listing resource not found.' });
    }
  } else {
    res.status(404).json({ error: 'Picture resource not found.' });
  }
});

module.exports = router;

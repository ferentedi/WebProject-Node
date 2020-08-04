const express = require('express');
const listingsDao = require('../database/listings');
const pictureDao = require('../database/pictures');

const router = express.Router();

const macros = require('../utils/macros');

const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

// ki kell toroljon egy kepet az adott listingbol
router.delete('/:id', [authenticationMiddleware(),
  authorizationMiddleware([macros.ADMIN_ROLE, macros.USER_ROLE])], async (req, res) => {
  const pictureId = req.params.id;
  // kikeresem az adott kepet az adatbazisbol
  const foundPicture = await pictureDao.findPicture({
    where: { id: pictureId },
  });
  // ha van ilyen id-ju kep
  if (foundPicture) {
    // megkeresem a listing-et amihez tartozik
    const listing = await listingsDao.findListing({
      where: { pictureId: foundPicture.id },
    });
    // ha van olyan listing amihez ez a kep tartozik
    if (listing) {
      // ha a bejelentkezett user a tulajdonosa a listing-nek
      const loggedInUserId = res.locals.userId;
      if (loggedInUserId === listing.userId) {
        foundPicture.destroy();
      } else {
        res.status(403).json({ error: 'You do not have authorization to delete this photo.' });
      }
      // updateolom a listinget
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

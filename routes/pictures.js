const express = require('express');
const listingsDao = require('../database/listings');
const pictureDao = require('../database/pictures');

const router = express.Router();
const db = require('../models');

const macros = require('../utils/macros');

const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

// admin only
router.post('/:id', [authenticationMiddleware(),
  authorizationMiddleware([macros.ADMIN_ROLE])], async (req, res) => {
  const { id } = req.params;
  const fileName = req.files.img.name;
  if (fileName) {
    let pictureId = null;
    await pictureDao.createPicture({ src: fileName }).then((createdPicture) => {
      pictureId = createdPicture.id;
    });
    await listingsDao.updateListing({ pictureId }, { where: { id } }).then(() => {
      const file = req.files.img;
      file.mv(`static/uploads/${fileName}`, (error) => {
        if (error) {
          res.render('error', { error: 'Error when moving file' });
        }
      });
    });
    const updatedListing = await listingsDao.findAllListings({
      where: {
        id,
      },
      include: [{
        model: db.pictures,
      }],
    });
    const loggedInUserName = res.locals.userName;
    const loggedInUserId = res.locals.userId;
    res.render('details', { listing: updatedListing[0], loggedInUserName, loggedInUserId });
  } else {
    res.status(400);
    res.render('error', { error: 'No file found.' });
  }
});

module.exports = router;

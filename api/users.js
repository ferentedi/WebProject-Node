const express = require('express');
const userDao = require('../database/users');
const listingsDao = require('../database/listings');
const utils = require('../utils/utils');
const macros = require('../utils/macros');

const router = express.Router();

// lekeri az osszes felhasznalot
router.get('/', async (req, res) => {
  const users = await userDao.findAllUsers();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(500).json({ error: 'Could not retrieve users.' });
  }
});

// keszit egy uj felhasznalot
router.post('/', async (req, res) => {
  const {
    email, password, fullname, birthdate,
  } = req.body;
  if (email && password) {
    const userData = await userDao.findUser({ where: { email } });
    if (userData === null) {
      const passwordWithSalt = utils.generatePasswordWithHashSalt(password);
      await userDao.createUser({
        fullname, email, birthdate, role: macros.USER_ROLE, passwordWithSalt,
      });
      res.status(201).json('User created successfully.');
    } else {
      res.status(409).json({ error: 'User already exists.' });
    }
  } else {
    res.status(400).json({ error: 'Invalid input data.' });
  }
});

// torli az adott id-ju felhasznalot
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userData = await userDao.findUser({ where: { id } });
  if (userData) {
    userData.destroy();
    res.status(204).json('User succesfully deleted.');
  } else {
    res.status(404).json({ error: 'User was not found.' });
  }
});

// frissiti az adott felhasznalot
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { newEmail } = req.body;
  await userDao.updateUser({ email: newEmail }, { where: { id } });
  const updatedUser = await userDao.findUser({ where: { id } });
  if (updatedUser) {
    res.status(200).json({ updatedUser });
  } else {
    res.status(500).json({ error: 'Could not update user.' });
  }
});

// megkeresi az adott id-ju felhasznalot
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const userData = await userDao.findUser({ where: { id } });
  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(500).json({ error: 'Could not find user.' });
  }
});

// megkeresi az adott id-ju felhasznalo hirdeteseit
router.get('/:id/listings', async (req, res) => {
  const { id } = req.params;
  const usersListings = await listingsDao.findAllListings({ where: { userId: id } });
  if (usersListings) {
    res.status(200).json(usersListings);
  } else {
    res.status(500).json({ error: 'Could not retrieve users listings.' });
  }
});

module.exports = router;

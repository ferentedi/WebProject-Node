const express = require('express');
const userDao = require('../database/users');

const router = express.Router();

const utils = require('../utils/utils');
const macros = require('../utils/macros');

// creates a new user with "user" role
router.get('/', async (req, res) => {
  res.render('signup');
});

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
      res.send('User created successfully.');
    } else {
      res.render('error', { error: 'User already exists.' });
    }
  } else {
    res.render('error', { error: 'Invalid input data.' });
  }
});

module.exports = router;

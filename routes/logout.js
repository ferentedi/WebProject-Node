const express = require('express');

const router = express.Router();
const macros = require('../utils/macros');


// logout
router.post('/', (req, res) => {
  res.clearCookie(macros.JWT_COOKIE_TOKEN);
  res.render('login');
});

module.exports = router;

const macros = require('../utils/macros');
const utils = require('../utils/utils');

module.exports = (roles = [macros.USER_ROLE, macros.USER_ADMIN]) => (req, res, next) => {
  Object.entries(req.cookies).forEach(([cookieName, cookieValue]) => {
    if (cookieName === macros.JWT_COOKIE_TOKEN) {
      utils.verifyJwtToken(cookieValue, (cookieError, payload) => {
        if (roles.includes(payload.userRole)) {
          next();
        } else {
          res.status(401);
          res.render('error', { error: cookieError });
          res.end();
        }
      });
    }
  });
};

const macros = require('../utils/macros');
const utils = require('../utils/utils');

module.exports = () => (req, res, next) => {
  Object.entries(req.cookies).forEach(([cookieName, cookieValue]) => {
    if (cookieName === macros.JWT_COOKIE_TOKEN) {
      utils.verifyJwtToken(cookieValue, (cookieError, payload) => {
        if (payload) {
          res.locals.userEmail = payload.userEmail;
          res.locals.userName = payload.userName;
          res.locals.userId = payload.userId;
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

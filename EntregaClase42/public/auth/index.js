const logger = require("../js/logger");

function webAuth(req, res, next) {
  if (req.session?.nombre) {
    logger.info(req.session);
    next();
  } else {
    res.redirect("/login");
  }
}



module.exports = webAuth

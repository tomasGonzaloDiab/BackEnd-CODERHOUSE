function webAuth(req, res, next) {
  if (req.session?.nombre) {
    console.log(req.session);
    next();
  } else {
    res.redirect("/login");
  }
}



module.exports = webAuth

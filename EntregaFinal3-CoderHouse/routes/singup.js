
const { Router } = require('express')
const path = require('path')
const ContenedorMongoDB = require('../contenedores/user/mongoFunctions.js')
const bcryptjs = require('bcryptjs')
const passport = require('../public/js/passport.js')



const singup = new Router();
const register = new ContenedorMongoDB();



singup.post(
  "/singup",
  passport.authenticate("local-signup", {
    successRedirect: "/home",
    failureRedirect: "/singup",
    passReqToCallback: true,
  })
);

singup.get("/singup", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/views/register.html"));
});
/* export default singup;
 */
module.exports = singup

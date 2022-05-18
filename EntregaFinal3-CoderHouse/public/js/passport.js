/* import passport from "passport";
import LocalStrategy from "passport-local";
import ContenedorMongoDB from "../../contenedores/user/mongoFunctions.js";
import bcryptjs from "bcryptjs";
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ContenedorMongoDB = require('../../contenedores/user/mongoFunctions.js');
const bcryptjs = require('bcryptjs');



const User = new ContenedorMongoDB();




passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "contraseña",
      passReqToCallback: true,
    },
    async (req, email, contraseña, done) => {
      const user = await User.findUser({ email: email });
      console.log(user);
      if (user) {
        return done(
          null,
          false,
          req.flash("signupMessage", "The Email is already Taken.")
        );
      } else {
        const newUser = new ContenedorMongoDB();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(contraseña);
        console.log(newUser);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "contraseña",
      passReqToCallback: true,
    },
    async (req, email, contraseña, done) => {
      const userBuscado = await User.findUser( email );
      if (!userBuscado) {
        console.log("NO ESTA!!!");
      }
      /*  if (
        bcryptjs.compareSync(contraseña.body.contraseña, userBuscado.contraseña)
      ) {
        return done(null, false, console.log("Incorrect Password"));
      } */
      console.log("ESTA!!!");
      return done(null, userBuscado);
    }
  )
);

passport.serializeUser((userBuscado, done) => {
  
  done(null, userBuscado[0].email);
});

passport.deserializeUser( async(email, done) => {
  const usuario = await User.findUser({ email });
  console.log("deserializeUser!!!");
  done(null, usuario);
});


/* export default passport;
 */
module.exports = passport

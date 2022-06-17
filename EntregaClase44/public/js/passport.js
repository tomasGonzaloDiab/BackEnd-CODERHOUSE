const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ContenedorMongoDB = require('../../contenedores/user/mongoFunctions.js');
const bcryptjs = require('bcryptjs');
const { createTransport } = require('nodemailer')
const logger = require('./logger.js')

const User = new ContenedorMongoDB();

const TEST_MAIL = "tomasdiab@gmail.com";


const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "tomasdiab@gmail.com",
    pass: "yxjmuecgoyrynsid",
  },
});



function checkAutentication(req,res,next){
  if(req.isAuthenticated()){
    next()
  } else{
    res.redirect("/login")
  }
}

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "contraseña",
      passReqToCallback: true,
    },
    async (req, email, contraseña, done) => {
      const listaDeUsuarios = await User.listAll();
      let usuarioBuscado = await User.findUser(email);
      if (usuarioBuscado.length > 0) {
        return done(null, false, logger.error("The Email is already Taken."));
      } else {
        let contraseña = req.body.contraseña;
        let contraseñaHash = await bcryptjs.hash(contraseña, 8);
        const newUser = {};
        newUser.nombre = req.body.nombre;
        newUser.email = req.body.email;
        newUser.contraseña = contraseñaHash;
        newUser.phone = req.body.phone;
        newUser.foto = req.body.foto;
        newUser.direccion = req.body.direccion;
        newUser.edad = req.body.edad;
        newUser.id = listaDeUsuarios.length + 1;
        await User.save(newUser);
        const mailOptions = {
          from: "Servidor Node.js",
          to: TEST_MAIL,
          subject: "Nuevo registro",
          html: `<h1 style="color: blue;">Informacion  <span style="color: green;">Nuevo registro</span></h1>
            <div>
             <ul>Datos:
             <li> Nombre:${newUser.nombre}</li>
             <li> email:${newUser.email}</li>
             <li> telefono:${newUser.phone}</li>
             <li> foto:${newUser.foto}</li>
             <li> direccion:${newUser.direccion}</li>
             <li> edad:${newUser.edad}</li>
             </ul>
             </div>
             `,
        };
        try {
          const info = await transporter.sendMail(mailOptions);
        } catch (error) {
          logger.error(error);
        }
        return done(null, newUser);
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
      const usuarioBuscado = await User.findUser( email );
      const userBuscado = usuarioBuscado[0]
      if (!userBuscado) {
        return done(null, false, logger.error("usuario incorrecto"));
      }else{
        if (!bcryptjs.compareSync(contraseña, userBuscado.contraseña)){
          return done(null, false, logger.error("Incorrect Password"));
        }else{
          
          return done(null, userBuscado);
        }
      }
    }
  )
);

passport.serializeUser((userBuscado, done) => {
  done(null, userBuscado.id);
});

passport.deserializeUser( async(email, done) => {
  const usuario = await User.findUser({ email });
  done(null, usuario);
});


module.exports = {passport,checkAutentication}

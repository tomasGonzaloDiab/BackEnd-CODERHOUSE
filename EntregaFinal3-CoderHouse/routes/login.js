/* import { Router } from "express";
import ContenedorMongoDB from "../contenedores/user/mongoFunctions.js";
import bcryptjs from "bcryptjs";
import path from "path";
import { Passport } from "passport/lib";


const login = new Router();
const users = new ContenedorMongoDB();

Passport.use('login', new LocalStrategy(
  (username, password, done) => {
    user
    if(err) returndone (err)
}))


login.post("/login", async (req, res) => {
  const listaUsuarios = await users.listAll();
  let usuarioToLog = req.body.email;
  let contraseñaToLog = req.body.contraseña;
  
  const usuarioBuscado = listaUsuarios.find((e) => e.email == usuarioToLog);
  console.log(usuarioBuscado.contraseña)

  //DESENCRYPTAR LA CONTRASEÑA
  if (usuarioBuscado && bcryptjs.compareSync(contraseñaToLog, usuarioBuscado.contraseña)) {
     res.redirect("/home");
    /* res.sendFile(path.join(process.cwd(), "public/views/index.html")); 
  } else {
    res.redirect("/register"); 
  }
});
export default login; */



/* import { Router } from "express";
import passport from "../public/js/passport.js";
import webAuth from "../public/auth/index.js";
import path from "path"; */

const { Router } = require('express')
const path = require('path')
const passport = require('../public/js/passport.js')
const webAuth = require('../public/auth/index.js')




const login = new Router();

login.get("/login", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/views/login.html"));
});

login.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/singup",
    passReqToCallback: true,
  })
);

/* export default login;
 */
module.exports = login

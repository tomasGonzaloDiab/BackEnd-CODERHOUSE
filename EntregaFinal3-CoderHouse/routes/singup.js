/* import { Router } from "express";
import path from "path";
import ContenedorUsuarios from '../contenedores/user/mongoFunctions.js'
import bcryptjs from "bcryptjs"
import { Passpor } from "passport/lib";

import  { createTransport } from "nodemailer";

const TEST_MAIL = 'tomasdiab@gmail.com'

const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
      user: 'tomasdiab@gmail.com',
      pass: 'vbsciaanpdufavco'
  }
});


const singup = new Router();
singup.get("/singup", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public/views/pages/register.ejs"));
});

const registro = new ContenedorUsuarios()

 singup.post("/singup", async (req, res) => {
    const listaUsuarios =  await registro.listAll()
    let contraseña = req.body.contraseña;
    let contraseñaHash = await bcryptjs.hash(contraseña, 8);

    const usuario = {
      nombre: req.body.nombre,
      email: req.body.email,
      numeroDeTelefono: req.body.numeroDeTelefono,
      contraseña: contraseñaHash ,
      foto: req.body.foto,
      direccion: req.body.direccion,
      edad: req.body.edad,
    };

  const mailOptions = {
      from: 'Servidor Node.js',
      to: TEST_MAIL,
      subject: 'nuevo registro',
      html: '<h1 style="color: blue;"> info <span style="color: green;">nuevo registro</span></h1>' 
}
  const yaExiste = listaUsuarios.find(e => e.email == usuario.email)
    if (yaExiste) {
        return res.send({ error: 'ya existe ese usuario' });
    }
    else{
        registro.save(usuario)
        try {
          const info = await transporter.sendMail(mailOptions)
          console.log(info)
       } catch (error) {
          console.log(error)
       }
        res.send("bien ahi")
}
});


export default singup; */

/* import { Router } from "express";
import ContenedorMongoDB from "../contenedores/user/mongoFunctions.js";
import bcryptjs from "bcryptjs";
import { createTransport } from "nodemailer";

import path from "path";

 */
const { Router } = require('express')
const path = require('path')
const ContenedorMongoDB = require('../contenedores/user/mongoFunctions.js')
const { createTransport } = require('nodemailer')
const bcryptjs = require('bcryptjs')


const singup = new Router();
const TEST_MAIL = "tomasdiab@gmail.com";
const register = new ContenedorMongoDB();

const listaUsuarios =  register.listAll();

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "tomasdiab@gmail.com",
    pass: "vbsciaanpdufavco",
  },
});

singup.post("/singup", async (req, res) => {
  let contraseña = req.body.contraseña;
  let contraseñaHash = await bcryptjs.hash(contraseña, 8);
  const usuario = {
    nombre: req.body.nombre,
    email: req.body.email,
    numeroDeTelefono: req.body.numeroDeTelefono,
    contraseña: contraseñaHash,
    foto: req.body.foto,
    direccion: req.body.direccion,
    edad: req.body.edad,
  };
  //PONER PARA QUE SEAN OBLIGATORIOS TODOS LOS CAMPOS
  const yaExiste = listaUsuarios.find((e) => e.email == usuario.email);

  const mailOptions = {
    from: "Servidor Node.js",
    to: TEST_MAIL,
    subject: "Nuevo registro",
    html: `<h1 style="color: blue;">Informacion  <span style="color: green;">Nuevo registro</span></h1>
    <div>
     <ul>Datos:
     <li> Nombre:${usuario.nombre}</li>
     <li> Nombre:${usuario.email}</li>
     <li> Nombre:${usuario.numeroDeTelefono}</li>
     <li> Nombre:${usuario.foto}</li>
     <li> Nombre:${usuario.direccion}</li>
     <li> Nombre:${usuario.edad}</li>
     </ul>
     </div>
     `,
  };

  if (yaExiste) {
    return res.sendFile(
      path.join(process.cwd(), "/public/views/userRegisted.html")
    );
  } else {
    register.save(usuario);
    try {
      const info = await transporter.sendMail(mailOptions);
      res.redirect("/home");
    } catch (error) {
      console.log(error);
    }
  }
});

singup.get("/singup", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/views/register.html"));
});
/* export default singup;
 */
module.exports = singup

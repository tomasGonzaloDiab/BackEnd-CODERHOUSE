/* import twilio from "twilio";
import { createTransport } from "nodemailer";

import dotenv from "dotenv";
 */
const dotenv = require('dotenv')
const { createTransport } = require('nodemailer')
const twilio = require('twilio')

const TEST_MAIL = "tomasdiab@gmail.com";
dotenv.config();

const accountSid = process.env.ACCESOSID;
const authToken = process.env.ACCESOTOKEN;

const client = twilio(accountSid, authToken);

//===========EMAIL========================
const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "tomasdiab@gmail.com",
    pass: "vbsciaanpdufavco",
  },
});
/* const mailOptions = {
  from: "Servidor Node.js",
  to: TEST_MAIL,
  subject: "Nuevo pedido",
  html: `<h1 style="color: blue;">Informacion de compra!</h1>
    <div>
     <ul>Datos:
     <li> Nombre:${usuario.nombre}</li>
     <li> Nombre:${usuario.email}</li>
     <li> Nombre:${cart}</li>

     </ul>
     </div>
     `,
};
try {
  const info = await transporter.sendMail(mailOptions);
  res.redirect("/home");
} catch (error) {
  console.log(error);
} */

//===============WHATSAPP=============================

/* const options = {
  body: `Nuevo pedido! 
  Nombre:${nombre}
  Email: ${email}.
  Su compra:
  ${cart}`,
  from: "whatsapp:+14155238886", //desde twilio
  to: "whatsapp:+5492281534787",
};

try {
  const message = await client.messages.create(options);
  console.log(message);
} catch (error) {
  console.log(error);
}

const buttonToCart = document.getElementById("buttonToCart");

 */

/* export { client, transporter }; */

module.exports = { client, transporter };

//deberia armar el metodo get del carrito para traer el cart con los carros. Tambien ver la forma de traer los datos del usuario

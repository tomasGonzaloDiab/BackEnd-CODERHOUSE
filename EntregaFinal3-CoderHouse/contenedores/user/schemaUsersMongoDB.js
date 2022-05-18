/* import Joi from "joi";
import  mongodb  from "../../config/config.js";
import mongoose from "mongoose"; */

const Joi = require('Joi')
const mongodb = require("../../config/config.js")
const mongoose = require('mongoose')

mongoose.connect(`${mongodb.conexion}`);
const email = Joi.string().min(4).required();
const contraseña = Joi.string().min(4).required();
const nombre = Joi.string().min(4).required();
const edad = Joi.number().min(6).required();
const direccion = Joi.string().min(4).required();
const numeroDeTelefono = Joi.string().min(4).required();
const foto = Joi.string().required();
const usersSchema = {
  email,
  contraseña,
  nombre,
  edad,
  direccion,
  numeroDeTelefono,
  foto,
};
const users = mongoose.model("users", usersSchema);
/* export default users */
module.exports= users
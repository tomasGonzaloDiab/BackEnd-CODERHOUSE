/* import Joi from "joi";
import  mongodb  from "../../config/config.js";
import mongoose from "mongoose"; */

const Joi = require('Joi')
const mongodb = require("../../config/config.js")
const mongoose = require('mongoose')

mongoose.connect(`${mongodb.conexion}`);
const nombre = Joi.string().min().required();
const email = Joi.string().min().required();
const contraseña = Joi.string().min().required();
const numeroDeTelefono = Joi.string().min(4).required();
const foto = Joi.string().required();
const direccion = Joi.string().min(4).required();
const edad = Joi.number().min().required();
const id = Joi.number().min().required();
const usersSchema = {
  nombre,
  email,
  contraseña,
  numeroDeTelefono,
  foto,
  direccion,
  edad,
  id
};
const users = mongoose.model("users", usersSchema);
/* export default users */
module.exports= users
/* import mongodb from "../../config/config.js";
import mongoose from "mongoose"; */

const mongodb = require("../../config/config.js")
const mongoose = require('mongoose')

const { Schema } = mongoose;

mongoose.connect(`${mongodb.conexion}`);

const prodSchema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  id: { type: Number, required: true },
});

const products = mongoose.model("products", prodSchema);

/* export default products;
 */

module.exports = products;

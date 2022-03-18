import Joi from 'joi';

const name = Joi.string().min(3).required()
const description = Joi.string().min(4).required()
const code = Joi.string().min(4).required()
const img = Joi.string().min(4).required()
const price = Joi.string().min(4).required()
const stock = Joi.string().min(4).required()
const timestamp = Joi.string().min(4).required()
const id = Joi.number().required()

export default {
  name,
  description,
  code,
  img,
  price,
  stock,
  timestamp,
  id
} 
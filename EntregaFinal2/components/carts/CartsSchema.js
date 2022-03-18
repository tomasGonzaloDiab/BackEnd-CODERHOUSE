import Joi from 'joi';

const id = Joi.number().required()
const timestamp = Joi.string().min(4).required()
const products = Joi.array()



export default {
id,
timestamp,
products
} 
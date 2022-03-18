import dotenv from "dotenv";

dotenv.config();

let productsDao
let cartsDao

if (`${process.env.DB}` === 'mongodb') {
  const { default : ProductsDaoMongo } = await import('../components/products/ProductsDaoMongo.js')
  const { default : CartsDaoMongo } = await import('../components/carts/CartsDaoMongo.js')
  productsDao = new ProductsDaoMongo()
  cartsDao = new CartsDaoMongo()
} 

if (`${process.env.DB}` === 'firebase') {
  const { default : ProductsDaoFirebase } = await import('../components/products/ProductsDaoFirebase.js')
  const { default : CartsDaoFirebase } = await import('../components/carts/CartsDaoFirebase.js')
  productsDao = new ProductsDaoFirebase()
  cartsDao = new CartsDaoFirebase()
} 


export {productsDao, cartsDao}
import ProductsSchema from './ProductsSchema.js';
import MongoContainer from '../containers/MongoContainer.js';

export default class ProductsDaoMongo extends MongoContainer{
  constructor(){
    super('products', ProductsSchema)
  }
}
import CartsSchema from './CartsSchema.js';
import MongoContainer from '../containers/MongoContainer.js';

export default class CartsDaoMongo extends MongoContainer {
  constructor() {
    super('carts', CartsSchema);
  }
}

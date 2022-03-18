import FirebaseContainer from "../containers/FirebaseContainer.js";


export default class ProductsDaoFirebase extends FirebaseContainer {
  constructor(){
    super('products')
  }
}
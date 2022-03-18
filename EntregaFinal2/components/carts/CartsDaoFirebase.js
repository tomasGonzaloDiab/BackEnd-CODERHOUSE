import FirebaseContainer from "../containers/FirebaseContainer.js";


export default class CartsDaoFirebase extends FirebaseContainer {
  constructor(){
    super('carts')
  }
}
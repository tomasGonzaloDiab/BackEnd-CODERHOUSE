const express = require('express')
const { Router } = express
const handlebars = require('express-handlebars')


const app = express()
const routerProductos = Router()
const routerCarrito = Router()
const fs = require('fs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views','./views')
app.set('view engine','hbs')

let productos = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
let cart = JSON.parse(fs.readFileSync('./productosCarrito.txt', 'utf-8'))
let administrador = true

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs'
}))

routerProductos.get('/:id?' ,(req, res) => {
    const prods = productos
    if(req.params && req.params.id<=prods.length){
        res.render("vistaProducto", {
            productos: prods[req.params.id-1],
            hayProductos: 1,
        });
    }else if(req.params.id>prods.length){
        res.send("no se encontro el producto")
    }  else {
        res.render("vistaProductos", {
            productos: prods,
            hayProductos: prods.length,
        });
    }
});

routerProductos.post("/", (req, res) => {
    if(administrador){
        const newProducto = req.body;
        newProducto.id = productos.length + 1;
        newProducto.timeStamp = Date.now();
        productos.push(newProducto);
        fs.writeFileSync("./productos.txt", JSON.stringify(productos));
        res.redirect("/api/productos")              
    }else{
        res.send("no tiene derecho de administrador")
    }
  });
routerProductos.put('/:id', (req,res)=>{
        const newProduct = req.body
        newProduct.id = req.params.id
        newProduct.timeStamp = Date.now();
        productos[req.params.id-1] = newProduct

        fs.writeFileSync("./productos.txt", JSON.stringify(productos));
        res.send(productos)
    
})
routerProductos.delete('/:id', (req,res)=>{
    if(administrador){
        productos.splice(req.params.id-1,1)
        for(let i=parseInt(req.params.id)-1; i<productos.length;i++){
            productos[i].id=i+1
        }
        fs.writeFileSync("./productos.txt", JSON.stringify(productos));
        res.send(productos)
    }else{
        res.send("no tiene derecho de administrador")
    }
})



//METODO POST BASE
routerCarrito.post("/", (req, res) => {
    const newCart = [];
    let totalCart = new Object();
    totalCart.productos = req.body;
    totalCart.id = cart.length + 1;
    totalCart.timeStamp = Date.now();
    newCart.push(totalCart);
    cart.push(newCart);
    fs.writeFileSync("./productosCarrito.txt", JSON.stringify(cart));
    res.send(cart);
});

//METODO DELETE
routerCarrito.delete("/:id", (req, res) => {
  let prodID = req.params.id;
  cart.splice(prodID -1, 1)
  //este for lo que hace es actualizar el id de los carritos posteriores al eliminado
  for(let i=parseInt(prodID)-1; i<cart.length;i++){
    cart[i].id=i+1}
  fs.writeFileSync("./productosCarrito.txt", JSON.stringify(cart));
  res.send(cart);
});
//METODO GET
routerCarrito.get("/:id/productos", (req, res) => {
  let prodID = req.params.id;
  const prodEnId = cart[prodID - 1];
  if (req.params && req.params.id <= cart.length) {
    res.render("vistaProductos", {
      productos: prodEnId,
      hayProductos: cart.length,
    });
  } else {
    res.render("vistaProducto", {
      productos: prodEnId,
      hayProductos: cart.length,
    });
  }
});
//METODO POST CON PROD

routerCarrito.post("/:id/productos", (req, res) => {
    let carrito = JSON.parse(fs.readFileSync('./productosCarrito.txt', 'utf-8'))
    let prodID = req.params.id; //id del carrito
    const newProd = req.body;
    const id = carrito[prodID - 1];
    newProd.id = id.length +1;
    carrito[prodID - 1].push(newProd);
    fs.writeFileSync("./productosCarrito.txt", JSON.stringify(carrito));
    const prodEnId = carrito[prodID - 1];
    res.send(prodEnId);
  });
//METODO DELETE CON ID
routerCarrito.delete("/:id/productos/:id_prod", (req, res) => {
  let cartID = req.params.id; //id del carrito
  let itemToDelete = cart[cartID - 1]; //variable auxiliar para acceder al tamaño del array de mi carrito
  let prodID = req.params.id_prod;
  itemToDelete.splice(prodID - 1, 1); //elimino el producto
  //recorro mi variable auxiliar para actualizar los id de mis productos
  for(let i=parseInt(prodID)-1; i<itemToDelete.length;i++){
    itemToDelete[i].id=i+1
  }
  cart[cartID - 1] = itemToDelete; //actualizo mi carrito y se sobrescribe
  fs.writeFileSync("./productosCarrito.txt", JSON.stringify(cart));
  res.send(cart[cartID - 1]);
});








app.listen(8080)
app.use('/static', express.static('public'))
app.use(express.static('public'))
app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

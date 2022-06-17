const { Router } = require('express')
const path = require('path')
const ContenedorProdMongoDB = require('../contenedores/products/productsMongoDB.js')
const ContenedorCartMongoDB = require('../contenedores/cart/cartMongoDB.js')
/* const {checkAutentication} = require('../public/js/passport.js')
*/
const logger = require('../public/js/logger.js')

const homeRouter = new Router();
const productos = new ContenedorProdMongoDB();
const carts = new ContenedorCartMongoDB()



homeRouter.get("/home", async (req, res) => {
  const listaProductos = await productos.listAll();
  res.render(path.join(process.cwd(), "/public/views/pages/home.ejs"), {
    productos: listaProductos,
    hayProductos: listaProductos.length,
    nombreUsuario: req.session?.email,
  });
});


//Agregar producto- AGREGARLE UN MIDDLEWARE PARA Q SEA SOLO DE ADMIN
homeRouter.post("/home", async (req, res) => {
  const listaProductos = await productos.listAll();
  const producto = {
    id: req.body.id,
    nombre: req.body.nombre,
    precio: req.body.precio,
  };
  const yaExiste = listaProductos.find((e) => e.nombre == producto.nombre);

  if (yaExiste) {
    return res.send({ error: "ya existe este producto" });
  } else {
    productos.save(producto);
  }


  res.send(producto);
});





homeRouter.post("/productos/:id", async (req, res) => {
  const carrito = await carts.listAll();
  if (carrito.length === 0) {
    const newElement = {};
    await carts.crear(newElement);
    logger.warn("Cart creado");
  } else {
    logger.warn("ya tenes un carrito");
  }
  const listaCarrito = await carts.listAll();
  //HASTA ACA CREA EL CARRITO, O VERIFICA SI NO TENES UNO.
  const listaProductos = await productos.listAll();
  
  const producto = {
    id: req.params.id.id,
    nombre: req.params.id.nombre,
    precio: req.params.id.precio,
  };

  const yaExiste = listaProductos.find((e) => e._id == req.params.id);

  listaCarrito[0].productos.push(yaExiste);
  const cartActualizado = await carts.update(
    listaCarrito[0].id,
    listaCarrito[0]
  );
  res.redirect("/home");
  //DESDE LA PAGINA, CUANDO APRIETO EL BOTON, SUBE AL CARRITO, PERO UN NULL
});

/* export default homeRouter; */

module.exports = homeRouter

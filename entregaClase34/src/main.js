const express = require("express");
const Router = require("express");
const cluster = require("cluster");
const {cpu} = require("os");
const {append} = require("express/lib/response");

const { faker } = require("@faker-js/faker");
const handlebars = require('express-handlebars')
const moment = require("moment");
const { normalize, schema, denormalize } = require("normalizr");
const util = require("util");
const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");
const ContenedorMemoria = require("../contenedores/ContenedorMemoria.js");
const ContenedorArchivo = require("../contenedores/ContenedorMensajesMongodb.js");
const prodFaker = new Router();
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);
const productosApi = new ContenedorMemoria();
const mensajesApi = new ContenedorArchivo();

const info = require("./routers/web/info.js")

//--normalizr
function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}
const autor = new schema.Entity("autor", {}, { idAttribute: "email" });
const texto = new schema.Entity(
  "texto",
  { autor: autor },
  { idAttribute: "id" }
);
const centroDeMensajes = new schema.Entity(
  "centroDeMensajes",
  {
    autores: [autor],
    mensajes: [texto],
  },
  { idAttribute: "id" }
);
//Fin normalizr
io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");
  socket.emit("productos", productosApi.listarAll());
  socket.on("update", (producto) => {
    productosApi.guardar(producto);
    io.sockets.emit("productos", productosApi.listarAll());
  });
  socket.emit("mensajes", await mensajesApi.listAll());
  socket.on("nuevoMensaje", async (mensaje) => {
    mensaje.fyh = moment().format("MMMM Do YYYY, h:mm:ss a");
    await mensajesApi.save(mensaje);
    const originalData = await mensajesApi.listAll();
    console.log(JSON.stringify(originalData).length);
    const normalizedData = normalize(originalData, centroDeMensajes);
    print(normalizedData);
    console.log(JSON.stringify(normalizedData).length);
    /*     const desnormalizedData = denormalize(
      normalizedData.result,
      centroDeMensajes,
      normalizedData.entities
    );
    console.log(JSON.stringify(desnormalizedData).length); */
    io.sockets.emit("mensajes", await mensajesApi.listAll());
  });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/productos-test", prodFaker);

app.use(info)

app.set('views','../views')
app.set('view engine','hbs')

app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  defaultLayout: 'index.hbs'
}))

const hola = "hola"
app.get("/", (req,res)=>{
  res.render("home".{
    hola:hola
  })
})

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
//prod con faker
let id = 0;
function generarCombinacion() {
  return {
    id: id++,
    title: faker.commerce.product(),
    price: faker.commerce.price,
    thumbnail: faker.image.imageUrl(),
  };
}
function generarProductosFk(cantidad) {
  const productos = [];
  for (let i = 0; i < cantidad; i++) {
    productos.push(generarCombinacion());
  }
  return productos;
}

const modoCluster = process.arv[3] === "CLUSTER"

if(modoCluster && cluster.isPrimary){
  const numCPUs= cpus().length

  console.log("Numero de cores: ", numCPUs)

  for(let i =0; i<numCPUs; i++){
    cluster.fork()
  }
  cluster.on('exit', worker => {
    console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
    cluster.destroy()
})
}else{
  const app = express();
}
prodFaker.use("/", (req, res) => {
  let prods = generarProductosFk(5);
    prods.forEach((prod) => {
    res.render("productos", {
      productos: prods,
      hayProductos: prods.length,
    });
  });
  res.json(prods);
});
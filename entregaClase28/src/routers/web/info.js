const {Router} = require("express");
const info = new Router();


/* Argumentos de entrada                                       - Path de ejecución
- Nombre de la plataforma (sistema operativo)       - Process id
- Versión de node.js                                               - Carpeta del proyecto
- Memoria total reservada (rss) */



info.get("/info", (req, res) => {

    let prods = generarProductosFk(5);
      prods.forEach((prod) => {
      res.render("productos", {
        productos: prods,
        hayProductos: prods.length,
      });
    });
    res.json(prods);

    res.render("info",{
        argsEntrada: argsEntrada,
        nomPlataforma: nomPlataforma,
        vNode: vNode,
        memReservada: memReservada,
        pathEjec: pathEjec,
        proccesId: proccesIdm,
        carpetaProyecto: carpetaProyecto

    })
  });
const express = require('express')
const { Router } = express

const app = express()
const router = Router()
const fs = require('fs')

let productos = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.set('views','./views')
app.set('view engine','ejs')




 app.post("/productos", (req, res) => {
    const newProducto = req.body;
    newProducto.id = productos.length + 1;
    productos.push(newProducto);
    fs.writeFileSync("./productos.txt", JSON.stringify(productos));
    res.redirect("/productos")
  });

app.get("/productos", (req, res) => {
    const prods = productos
    res.render("datos", {
        productos: prods,
        hayProductos: prods.length,
    });
});
app.listen(8080 , console.log('corriendo'))
app.use('/static', express.static('public'))
app.use(express.static('public'))
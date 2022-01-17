const express = require('express')

const app = express()

const PORT = 8080 || process.env.PORT

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

const fs = require('fs');

const productos = JSON.parse(fs.readFileSync('./Clase6/Productos.txt', 'utf-8'))

app.get('/Productos', (req, res) => {
    res.send(productos)
 })

let productoRandom = productos[Math.floor(Math.random() * productos.length)]

app.get('/ProductosRandom', (req, res) => {
    res.send(productoRandom)
 })
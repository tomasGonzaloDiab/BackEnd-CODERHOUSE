const {Router} = require("express");
const info = new Router();


const { cpus } = require("os");


const argumentosEntrada = process.argv;
const pathEjec = process.cwd();
const nomPlataforma = process.platform;
const proccesId = process.pid;
const vNode = process.version;
const carpetaProyecto = process.cwd();
const memReservada = process.memoryUsage();


info.get("/info", (req, res) => {

    res.render("info.hbs",{
        argumentosEntrada: argumentosEntrada,
        nomPlataforma: nomPlataforma,
        vNode: vNode,
        memReservada: memReservada,
        pathEjec: pathEjec,
        proccesId: proccesId,
        carpetaProyecto: carpetaProyecto
    })
  });

module.exports = info
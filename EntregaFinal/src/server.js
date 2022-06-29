const express = require('express')
const app = express();
const port = process.env.PORT || 8080;
const cluster = require('cluster')
const {Server:HttpServer} = require('http')
const httpServer = new HttpServer(app)
const logger = require('./logs/logger.js')

const numCPUs = require('os').cpus().length



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


/* CLUSTER Y FORK  */

if (process.env.MODO == "CLUSTER") {
    httpServer.listen(port, () => {
      logger.info(`Server is run on port ${port} in proces ${process.pid}`);
    });
    httpServer.on("error", (error) => logger.error(`Error en servidor ${error}`));
  } else {
    if (cluster.isPrimary) {
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on("exit", (worker, Code, signal) => {
        logger.info(`worker ${worker.process.pid} finalizo`);
      });
    } else {
      httpServer.listen(port, () => {
        logger.info(`server corriendo en  ${port} con id proceso ${process.pid}`);
      });
      httpServer.on("error", (error) =>
      logger.error(`Error en servidor ${error}`)
      );
    }
  }
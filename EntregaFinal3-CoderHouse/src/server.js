
const express = require('express')
const login = require('../routes/login.js')
const singup = require('../routes/singup.js')
const homeRouter = require('../routes/home.js')
const logout = require('../routes/logout.js')
const cartRout = require('../routes/cart.js')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cluster = require('cluster')
const {Server:HttpServer} = require('http')
const numCPUs = require('os').cpus().length
const app = express();
const port = process.env.PORT || 8000;
const httpServer = new HttpServer(app)



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(login);
app.use(singup);
app.use(homeRouter);
app.use(logout);
app.use(cartRout);

app.set("view engine", "ejs");



app.use(session({
  secret: 'mysecretsession',
  cookie: {
    httpOnly: false,
    secure: false,
  },
  rolling: true,
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
/* CLUSTER Y FORK  */

if (process.env.MODO == "CLUSTER") {
  httpServer.listen(port, () => {
    console.log(`Server is run on port ${port} in proces ${process.pid}`);
  });
  httpServer.on("error", (error) => console.log(`Error en servidor ${error}`));
} else {
  if (cluster.isPrimary) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, Code, signal) => {
      console.log(`worker ${worker.process.pid} finalizo`);
    });
  } else {
    httpServer.listen(port, () => {
      console.log(`server corriendo en  ${port} con id proceso ${process.pid}`);
    });
    httpServer.on("error", (error) =>
    console.log(`Error en servidor ${error}`)
    );
  }
}


app.use(cookieParser("pruebaCookie"))
app.use(bodyParser.json())

 

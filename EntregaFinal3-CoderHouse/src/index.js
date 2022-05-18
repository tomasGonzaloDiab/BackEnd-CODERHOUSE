/* import express from "express";
import login from "../routes/login.js"
import singup from "../routes/singup.js";
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(login)
app.use(singup)

app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
}); */

/* import express from "express";
import login from "../routes/login.js";
import singup from "../routes/singup.js";
import homeRouter from "../routes/home.js";
import logout from "../routes/logout.js";
import cartRout from "../routes/cart.js";
import passport from "passport";
import session from "express-session"; */

const express = require('express')
const login = require('../routes/login.js')
const singup = require('../routes/singup.js')
const homeRouter = require('../routes/home.js')
const logout = require('../routes/logout.js')
const cartRout = require('../routes/cart.js')
const passport = require('passport')
const session = require('express-session')

const app = express();
const port = process.env.PORT || 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(login);
app.use(singup);
app.use(homeRouter);
app.use(logout);
app.use(cartRout);

app.set("view engine", "ejs");

/* app.use(session({
    secret: "mysecretsession",
    resave: false,
    saveUninitialized: false,
  })
); */


app.use(session({
  secret: 'mysecretsession',
  cookie: {
    httpOnly: false,
    secure: false,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
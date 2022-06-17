const { Router } = require('express')
const path = require('path')
const ContenedorCartMongoDB = require('../contenedores/cart/cartMongoDB.js')
const { client, transporter } = require('../public/js/msjCarrito.js')
const logger = require('../public/js/logger.js')

const cartRout = new Router();
const carts = new ContenedorCartMongoDB();
const TEST_MAIL = "tomasdiab@gmail.com";

cartRout.get("/cart", async (req, res) => {
  const cartTotal = await carts.listAll();
  res.render(path.join(process.cwd(), "/public/views/pages/cart.ejs"), {
    productos: cartTotal[0].productos,
    hayProductos: cartTotal.length,
    nombreUsuario: req.session?.email,
  });
});



cartRout.post("/compra-realizada", async (req, res) => {
  const cartTotal = await carts.listAll();

  const options = {
    body: `Nuevo pedido 
        Usted compró:
       
        ${cartTotal[0].productos.map(
          (p) => `Producto: ${p.nombre} - Código:${p.id}`
        )}
    `,
    from: "whatsapp:+14155238886",
    to: "whatsapp:+5492281467372",
  };



  const mailOptions = {
    from: "Servidor Node.js",
    to: TEST_MAIL,
    subject: "Nuevo pedido",
    html: `<h2 style="color: blue;">Nuevo pedido:</h3>
    <br>
    <ul>
        ${cartTotal[0].productos.map(
          (p) => `<li style="color: yellow;" >Producto: ${p.nombre} - Código:${p.id}</li>`
        )}
    </ul>
    <h3 style="color: blue;">Gracias por su compra!</h3>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    const message = await client.messages.create(options);
    logger.info(message.body)
    logger.info("EMAIL ENVIADO!");
  } catch (error) {
    logger.error(error);
  }
  res.sendFile(path.join(process.cwd(), "/public/views/compra.html"));

});


module.exports = cartRout




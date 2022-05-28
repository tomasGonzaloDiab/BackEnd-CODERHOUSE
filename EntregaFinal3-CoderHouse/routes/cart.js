

const { Router } = require('express')
const path = require('path')
const ContenedorCartMongoDB = require('../contenedores/cart/cartMongoDB.js')
const { client, transporter } = require('../public/js/msjCarrito.js')


const cartRout = new Router();
const carts = new ContenedorCartMongoDB();
const TEST_MAIL = "tomasdiab@gmail.com";

cartRout.get("/cart", async (req, res) => {
  const cartTotal = await carts.listAll();
  res.render(path.join(process.cwd(), "/public/views/pages/cart.ejs"), {
    productos: cartTotal[0].productos /* CHEQUEAR ESTOOOOOO */,
    hayProductos: cartTotal.length,
    nombreUsuario: req.session?.email,
  });
});



cartRout.post("/compra-realizada", async (req, res) => {
  const cartTotal = await carts.listAll();
  const mailOptions = {
    from: "Servidor Node.js",
    to: TEST_MAIL,
    subject: "Nuevo pedido",
    html: `<div>
    <h3>Gracias por su compra!</h3>
  </div>
  <div class="container mt-3">
    <div class="jumbotron">
      <h1>Lista de Productos</h1>
      <br />
      <% if(${cartTotal.length != 0}){ %>
      <div class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Foto</th>
          </tr>
          <%productos.forEach(function(producto) {%>
          <tr>
            <td><%=producto.nombre%></td>
            <td><%=producto.precio%></td>
            <td>
              <img
                width="50"
                alt="not
              found"
              />
            </td>
          </tr>
          <%});%>
        </table>
      </div>
      <% } else{ %>
      <h3 class="alert alert-warning">No se encontraron productos</h3>
      <% } %>
    </div>
  </div>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("EMAIL ENVIADO!");
  } catch (error) {
    console.log(error);
  }
  res.sendFile(path.join(process.cwd(), "/public/views/compra.html"));
});


module.exports = cartRout




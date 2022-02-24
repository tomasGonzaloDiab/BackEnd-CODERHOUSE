para iniciar el proyecto usamos el script start que es: node server.js
los endpoints a utilizar en postman son los siguientes:
PARA MIS PRODUCTOS
GET en http://localhost:8080/api/productos{
    este get me muestra la lista de productos total, esta disponilbre para todos
}
GET en http://localhost:8080/api/productos/:id{
    este get me muestra un producto por su id, en caso de existir.  Esta disponilbre para todos
}
POST en http://localhost:8080/api/productos{
    me permite agregar un producto a mi lista de productos. Solo para administradores
}
PUT en http://localhost:8080/api/productos/:id{
    actualizo un producto por su id. Escribo mi nuevo producto en el body de Postman y se actualizara a mi lista de productos.
    solo se cambiaran los datos nuevos del mismo. Solo para administradores
}
DELETE en http://localhost:8080/api/productos/:id{
    elimino un producto por su id. Solo para administradores
}

PARA MIS CARRITOS
RECOMENDACION:productosCarrito.txt viene vacio, por lo tanto es requerido agregar carritos y productos primero, para luego probar el resto de endpoints

POST en http://localhost:8080/api/carrito{
    Crea un nuevo carrito, le asigna un id, timeStamp y un producto en caso de que haya uno en el body. Retorna el id de este carrito 
}
DELETE en http://localhost:8080/api/carrito/:id{
    Elimino un carrito por su id, y reordeno el resto de carritos para que esten en una posicion correcta.
}
GET en http://localhost:8080/api/carrito/:id/productos{
    me muestra los productos presentes en un carrito especificado.
}
POST en http://localhost:8080/api/carrito/:id/productos{
    agrego un producto al carrito especificado. 
}
DELETE en http://localhost:8080/api/carrito/:id/productos{
    elimino un producto segun su id, de un carrito en especifico.
}

ACLARACION: como la consigna del proyecto me dice que los carritos deben tener la siguiente estructura:
id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
yo al agregar productos, si los agrego a ese objeto de productos, me quedarian desordenados ya que al ser un objeto no tengo un indice para acceder a ellos,
por ende lo que hago es que el primer producto que se agrega, cuando se crea un carrito con POST, tenga esa estructura, y luego al agregarle mas productos 
se agreguen en las siguientes posiciones del vector de ese carrito. Me parecio lo mas lógico ya que al poder tener mas de un carrito ocurre ese problema. 
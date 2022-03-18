import { Router } from 'express';
import { cartsDao, productsDao } from '../../daos/index.js';

const cartsRouter = new Router();

export default (app) => {
  app.use('/api/carrito', cartsRouter);

  cartsRouter.get('/', async (req, res) => {
    res.json(await cartsDao.listAll());
  });

  cartsRouter.get('/:id', async (req, res) => {
    res.json(await cartsDao.list(req.params.id));
  });

  cartsRouter.post('/', async (req, res) => {
    res.json(await cartsDao.save(req.body));
  });

  cartsRouter.delete('/', async (req, res) => {
    res.json(await cartsDao.deleteAll());
  });

  cartsRouter.delete('/:id', async (req, res) => {
    res.json(await cartsDao.delete(req.params.id));
  });

  // Products in cart
  cartsRouter.post('/:id/productos', async (req, res) => {
    const cart = await cartsDao.list(req.params.id);
    const product = await productsDao.list(req.body.id);
    console.log(product[0])
    cart[0].products.push(product[0]);
    await cartsDao.update(req.params.id, cart[0]);
    res.json(cart[0]);
  });

  cartsRouter.get('/:id/productos', async (req, res) => {
    const cart = await cartsDao.list(req.params.id)
    res.json(cart[0].products)
  });

  cartsRouter.delete('/:id/productos/:productCode', async (req, res)=>{
    const cart = await cartsDao.list(req.params.id)
    const index = cart[0].products.findIndex(product => product.id == req.params.productCode)
    console.log(index)
    if(index !=  -1) {
      cart[0].products.splice(index, 1)
      await cartsDao.update(req.params.id, cart[0])
    }
    res.json(cart[0]);
  })
};

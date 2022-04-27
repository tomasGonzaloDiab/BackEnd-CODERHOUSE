import { Router } from 'express';
import { productsDao } from '../../daos/index.js';

const productsRouter = new Router();

export default (app) => {
  app.use('/api/productos', productsRouter)

  productsRouter.get('/', async(req,res)=>{
    res.json(await productsDao.listAll())
  })

  productsRouter.get('/:id', async (req, res) => {
    res.json(await productsDao.list(req.params.id))
})

productsRouter.post('/', async (req, res) => {
  res.json(await productsDao.save(req.body))
})

productsRouter.put('/:id', async (req, res) => {
  res.json(await productsDao.update(req.params.id, req.body))
})

productsRouter.delete('/', async (req, res) =>

{
  res.json(await productsDao.deleteAll())
})

productsRouter.delete('/:id', async (req, res) => {
  res.json(await productsDao.delete(req.params.id))
})

};

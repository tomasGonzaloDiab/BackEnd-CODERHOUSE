import CartsController from '../components/carts/CartsController.js';
import ProductsController from '../components/products/ProductsController.js';

export default (app) => {
  ProductsController(app);
  CartsController(app)
  app.get('*', (req, res) =>
  res.status(404).json({
    error: -2,
    description: `ruta ${req.originalUrl} método get no implementado`,
  })
);
};

const { Router } = require('express');
const { AuthRouter } = require('./modules/auth/auth.routes');
const { CategoryRouter } = require('./modules/category/category.routes');
const { UserRouter } = require('./modules/user/user.routes');
const { ProductRouter } = require('./modules/product/product.routes');
const { CartRouter } = require('./modules/cart/cart.routes');
const { DiscountRouter } = require('./modules/discount/discount.routes');
const mainRouter = Router();

mainRouter.use('/auth', AuthRouter);
mainRouter.use('/user', UserRouter);
mainRouter.use('/categories', CategoryRouter);
mainRouter.use('/products', ProductRouter);
mainRouter.use('/cart', CartRouter);
mainRouter.use('/discount', DiscountRouter);

module.exports = mainRouter;
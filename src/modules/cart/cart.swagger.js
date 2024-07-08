/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart Module & Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AddProductToCart:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           example: ""
 *         quantity:
 *           type: number
 *           example: ""
 *     RemoveProductFromCart:
 *       type: object
 *       required:
 *         - productId
 *       properties:
 *         productId:
 *           type: string
 *           example: ""
 *     ApplyDiscount:
 *       type: object
 *       required:
 *         - discountCode
 *       properties:
 *         discountCode:
 *           type: string
 *           example: ""
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the current user's cart
 *     tags: 
 *       - Cart
 *     responses:
 *       200:
 *         description: Successfully retrieved cart
 */

/**
 * @swagger
 * /cart/add-product:
 *   post:
 *     summary: Add a product to the cart
 *     tags: 
 *       - Cart
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/AddProductToCart'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddProductToCart'
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 */

/**
 * @swagger
 * /cart/remove-product:
 *   post:
 *     summary: Remove a product from the cart
 *     tags: 
 *       - Cart
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/RemoveProductFromCart'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RemoveProductFromCart'
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 */

/**
 * @swagger
 * /cart/apply-discount:
 *   post:
 *     summary: Apply a discount code to the cart
 *     tags: 
 *       - Cart
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/ApplyDiscount'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApplyDiscount'
 *     responses:
 *       200:
 *         description: Discount applied successfully
 */

/**
 * @swagger
 * /cart/calculate-total:
 *   get:
 *     summary: Calculate the total price of the cart
 *     tags: 
 *       - Cart
 *     responses:
 *       200:
 *         description: Total calculated successfully
 */

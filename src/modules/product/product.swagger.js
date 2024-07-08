/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product Module & Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProduct:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           example: ""
 *         description:
 *           type: string
 *           example: ""
 *         price:
 *           type: number
 *           example: ""
 *         category:
 *           type: string
 *           example: ""
 *     UpdateProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: ""
 *         description:
 *           type: string
 *           example: ""
 *         price:
 *           type: number
 *           example: ""
 *         category:
 *           type: string
 *           example: ""

 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Product
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       201:
 *         description: product created successfully
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: successfully retrieved products
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: ""
 *     responses:
 *       200:
 *         description: Successfully retrieved product
 *       404:
 *         description: Product Not Found
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: ""
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProduct'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProduct'
 *     responses:
 *       200:
 *         description: Product Updated Successfully
 *       404:
 *         description: Product Not Found
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: ""
 *     responses:
 *       200:
 *         description: Product Deleted Successfully
 *       404:
 *         description: Product Not Found
 */

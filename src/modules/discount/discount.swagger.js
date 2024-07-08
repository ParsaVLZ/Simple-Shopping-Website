/**
 * @swagger
 * tags:
 *   name: Discount
 *   description: Discount Module & Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateDiscount:
 *       type: object
 *       required:
 *         - code
 *         - percentage
 *       properties:
 *         code:
 *           type: string
 *           example: ""
 *         percentage:
 *           type: number
 *           example: ""
 *     UpdateDiscount:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           example: ""
 *         percentage:
 *           type: number
 *           example: ""
 */

/**
 * @swagger
 * /discount:
 *   post:
 *     summary: Create a new discount
 *     tags:
 *       - Discount
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/CreateDiscount'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDiscount'
 *     responses:
 *       201:
 *         description: Discount created successfully
 */

/**
 * @swagger
 * /discount/{id}:
 *   put:
 *     summary: Update a discount
 *     tags:
 *       - Discount
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
 *             $ref: '#/components/schemas/UpdateDiscount'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDiscount'
 *     responses:
 *       200:
 *         description: Discount updated successfully
 *       404:
 *         description: Discount Not found
 */

/**
 * @swagger
 * /discount/{id}:
 *   delete:
 *     summary: Delete a discount
 *     tags:
 *       - Discount
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: ""
 *     responses:
 *       200:
 *         description: Discount deleted successfully
 *       404:
 *         description: Discount Not found
 */

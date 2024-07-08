/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category Module & Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategory:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: ""
 *         slug:
 *           type: string
 *           example: ""
 *         parent:
 *           type: string
 *           example: ""
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Category
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: Successfully retrieved
 */

/**
 * @swagger
 * /categories/root:
 *   get:
 *     summary: Get all Root Categories
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: Successfully retrieved
 */

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags:
 *       - Category
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: ""
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Category Not Found
 */

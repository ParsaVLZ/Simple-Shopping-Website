/**
 * @swagger
 * tags:
 *  name: User
 *  description: User Module & Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOTP:
 *              type: object
 *              required:
 *                  - mobile
 *              properties:
 *                  mobile:
 *                      type: string
 */

/**
 * @swagger
 * 
 * /user/identity:
 *  get:
 *      summary: Get User Profile
 *      tags:
 *          - User
 *      responses:
 *          200:
 *              description: Success
 */
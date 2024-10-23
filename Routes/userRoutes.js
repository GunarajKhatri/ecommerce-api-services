/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the user.
 *         username:
 *           type: string
 *           description: The user's username.
 *         email:
 *           type: string
 *           description: The user's email address.
 *         password:
 *           type: string
 *           description: The user's password.
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             postalCode:
 *               type: string
 *             country:
 *               type: string
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           description: The role of the user.
 *         cart:
 *           type: object
 *           properties:
 *             items:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                     description: The ID of the product.
 *                   quantity:
 *                     type: number
 *                     description: The quantity of the product in the cart.
 *             cartTotalPrice:
 *               type: number
 *               description: Total price of the items in the cart.
 *       required:
 *         - username
 *         - email
 *         - password
 *         - role
 */

 import { Router } from "express";
 import passport from "passport";
 import {
   adminUpdateUser,
   getAllUsers,
   getOwnProfile,
   getUserById,
   updateUser,
 } from "../controllers/usercontroller.js";
 import { checkAdminRole } from "../middleware/checkRole.js";
 
 const router = Router();
 
 /**
  * @swagger
  * tags:
  *   - name: Users
  *     description: User management
  */
 
 /**
  * @swagger
  * /api/users:
  *    get:
  *      summary: Get all users
  *      tags: [Users]
  *      security:
  *        - AdminBearerAuth: []
  *      responses:
  *        200:
  *          description: A list of users.
  *        401:
  *          description: Unauthorized.
  *        403:
  *          description: Forbidden.
  */
 router.get(
   "/users",
   passport.authenticate("jwt", { session: false }),
   checkAdminRole,
   getAllUsers
 );
 
 /**
  * @swagger
  *  /api/user/profile:
  *    get:
  *      summary: Get own profile
  *      tags: [Users]
  *      security:
  *        - UserBearerAuth: []
  *      responses:
  *        200:
  *          description: The current user's profile.
  *        401:
  *          description: Unauthorized.
  */
 router.get(
   "/user/profile",
   passport.authenticate("jwt", { session: false }),
   getOwnProfile
 );
 
 /**
  * @swagger
  *  /api/user/{id}:
  *    get:
  *      summary: Get user details by ID (admin only)
  *      tags: [Users]
  *      security:
  *        - AdminBearerAuth: []
  *      parameters:
  *        - in: path
  *          name: id
  *          required: true
  *          description: The user ID.
  *          schema:
  *            type: string
  *      responses:
  *        200:
  *          description: The user details.
  *        401:
  *          description: Unauthorized.
  *        403:
  *          description: Forbidden.
  */
 router.get(
   "/user/:id",
   passport.authenticate("jwt", { session: false }),
   checkAdminRole,
   getUserById
 );
 
/**
 * @swagger
 *  /api/user/profile:
 *    put:
 *      summary: Update own profile
 *      tags: [Users]
 *      security:
 *        - UserBearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: The user's updated username.
 *                email:
 *                  type: string
 *                  description: The user's updated email address.
 *                address:
 *                  type: object
 *                  properties:
 *                    street:
 *                      type: string
 *                    city:
 *                      type: string
 *                    state:
 *                      type: string
 *                    postalCode:
 *                      type: string
 *                    country:
 *                      type: string
 *      responses:
 *        200:
 *          description: Profile updated successfully.
 *        400:
 *          description: Bad request.
 *        401:
 *          description: Unauthorized.
 */

 router.put(
   "/user/profile",
   passport.authenticate("jwt", { session: false }),
   updateUser
 );
 
 /**
 * @swagger
 *  /api/user/{id}:
 *    put:
 *      summary: Update user by ID (admin only)
 *      tags: [Users]
 *      security:
 *        - AdminBearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The user ID.
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: The user's updated username.
 *                email:
 *                  type: string
 *                  description: The user's updated email address.
 *                password:
 *                  type: string
 *                  description: The user's updated password.
 *                address:
 *                  type: object
 *                  properties:
 *                    street:
 *                      type: string
 *                    city:
 *                      type: string
 *                    state:
 *                      type: string
 *                    postalCode:
 *                      type: string
 *                    country:
 *                      type: string
 *                role:
 *                  type: string
 *                  enum: [admin, user]
 *                  description: The user's role (admin or user).
 *      responses:
 *        200:
 *          description: User updated successfully.
 *        400:
 *          description: Bad request.
 *        401:
 *          description: Unauthorized.
 *        403:
 *          description: Forbidden.
 */
router.put(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  checkAdminRole,
  adminUpdateUser
);

 
 export default router;
 
import { Router } from "express";
import passport from "passport";
import {
  createCategory,
  getAllCategory,
  getProductsByCategory,
} from "../controllers/categorycontroller.js";
import { checkAdminRole } from "../middleware/checkRole.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management and retrieval
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Category ID
 *                   name:
 *                     type: string
 *                     description: Category name
 *                   description:
 *                     type: string
 *                     description: Category description
 *                   products:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: IDs of products in the category
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */
router.get("/categories", getAllCategory);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - AdminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 description: Description of the category
 *                 example: "Category for electronic products"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Category name must be unique
 *       500:
 *         description: Internal server error
 */
router.post(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  checkAdminRole,
  createCategory
);

/**
 * @swagger
 * /api/categories/{categoryName}:
 *   get:
 *     summary: Get products by category name
 *     tags: [Categories]
 *     parameters:
 *       - name: categoryName
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the category
 *     responses:
 *       200:
 *         description: Successfully retrieved products for the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Category ID
 *                 name:
 *                   type: string
 *                   description: Category name
 *                 description:
 *                   type: string
 *                   description: Category description
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Product ID
 *                       name:
 *                         type: string
 *                         description: Product name
 *                       price:
 *                         type: number
 *                         description: Product price
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get("/categories/:categoryName", getProductsByCategory);

export default router;

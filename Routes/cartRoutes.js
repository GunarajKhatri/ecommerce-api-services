import { Router } from "express";
import passport from "passport";
import {
  addItemToCart,
  getCartItems,
  removeItemFromCart,
} from "../controllers/cartcontrolller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: Cart management
 */

/**
 * @swagger
 * /api/cart/items:
 *   get:
 *     summary: Get all cart items
 *     tags: [Cart]
 *     security:
 *       - UserBearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved cart items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                       quantity:
 *                         type: number
 *                       price:
 *                         type: number
 *                 cartTotalPrice:
 *                   type: number
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/cart/items",
  passport.authenticate("jwt", { session: false }),
  getCartItems
);

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     security:
 *       - UserBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to add.
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product to add.
 *     responses:
 *       200:
 *         description: Item added to cart successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/cart/items",
  passport.authenticate("jwt", { session: false }),
  addItemToCart
);

/**
 * @swagger
 * /api/cart/items/{productId}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     security:
 *       - UserBearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to remove.
 *     responses:
 *       200:
 *         description: Item removed from cart successfully.
 *       404:
 *         description: Item not found in cart or user not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/cart/items/:productId",
  passport.authenticate("jwt", { session: false }),
  removeItemFromCart
);

export default router;

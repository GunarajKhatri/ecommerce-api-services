import { Router } from "express";
import passport from "passport";
import {
  checkoutCart,
  checkoutProduct,
} from "../controllers/checkoutcontroller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Checkout
 *     description: Checkout management
 */

/**
 * @swagger
 * /api/checkout/cart:
 *   post:
 *     summary: Checkout the entire cart
 *     tags: [Checkout]
 *     security:
 *       - UserBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingAddress:
 *                 type: string
 *                 description: The shipping address for the order.
 *               billingAddress:
 *                 type: string
 *                 description: The billing address for the order.
 *               paymentMethod:
 *                 type: string
 *                 description: The payment method chosen by the user.
 *     responses:
 *       201:
 *         description: Order created successfully.
 *       404:
 *         description: User not found.
 *       400:
 *         description: Insufficient stock.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/checkout/cart",
  passport.authenticate("jwt", { session: false }),
  checkoutCart
);

/**
 * @swagger
 * /api/checkout/product/{productId}:
 *   post:
 *     summary: Checkout a specific product by ID
 *     tags: [Checkout]
 *     security:
 *       - UserBearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID to checkout.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product to checkout.
 *               shippingAddress:
 *                 type: string
 *                 description: The shipping address for the order.
 *               billingAddress:
 *                 type: string
 *                 description: The billing address for the order.
 *               paymentMethod:
 *                 type: string
 *                 description: The payment method chosen by the user.
 *     responses:
 *       201:
 *         description: Order created successfully.
 *       404:
 *         description: Product not found.
 *       400:
 *         description: Insufficient stock.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/checkout/product/:productId",
  passport.authenticate("jwt", { session: false }),
  checkoutProduct
);

export default router;

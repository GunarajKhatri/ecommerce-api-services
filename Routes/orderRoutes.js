import { Router } from "express";
import passport from "passport";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/ordercontroller.js";
import { checkAdminRole } from "../middleware/checkRole.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Order management and retrieval
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - AdminBearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Order ID
 *                   user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: User ID
 *                       username:
 *                         type: string
 *                         description: Username
 *                       email:
 *                         type: string
 *                         description: User email
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               description: Product ID
 *                             name:
 *                               type: string
 *                               description: Product name
 *                             imageUrl:
 *                               type: string
 *                               description: URL of product image
 *                         quantity:
 *                           type: number
 *                           description: Quantity of product
 *                         price:
 *                           type: number
 *                           description: Price of the product
 *                   totalAmount:
 *                     type: number
 *                     description: Total amount of the order
 *                   status:
 *                     type: string
 *                     description: Order status
 *                     enum: [Pending, Shipped, Delivered, Cancelled]
 *                   shippingAddress:
 *                     type: object
 *                     properties:
 *                       street:
 *                         type: string
 *                       city:
 *                         type: string
 *                       state:
 *                         type: string
 *                       postalCode:
 *                         type: string
 *                       country:
 *                         type: string
 *                   billingAddress:
 *                     type: object
 *                     properties:
 *                       street:
 *                         type: string
 *                       city:
 *                         type: string
 *                       state:
 *                         type: string
 *                       postalCode:
 *                         type: string
 *                       country:
 *                         type: string
 *                   paymentMethod:
 *                     type: string
 *                     enum: [Credit Card, PayPal, Cash on Delivery, Bank Transfer]
 *                     description: Payment method used for the order
 *                   orderNotes:
 *                     type: string
 *                     description: Additional notes related to the order
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */
router.get(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  checkAdminRole,
  getAllOrders
);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - AdminBearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the order to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Order ID
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: User ID
 *                     username:
 *                       type: string
 *                       description: Username
 *                     email:
 *                       type: string
 *                       description: User email
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Product ID
 *                           name:
 *                             type: string
 *                             description: Product name
 *                       quantity:
 *                         type: number
 *                         description: Quantity of product
 *                       price:
 *                         type: number
 *                         description: Price of the product
 *                 totalAmount:
 *                   type: number
 *                   description: Total amount of the order
 *                 status:
 *                   type: string
 *                   enum: [Pending, Shipped, Delivered, Cancelled]
 *                   description: Order status
 *                 shippingAddress:
 *                   type: object
 *                   properties:
 *                     street:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     postalCode:
 *                       type: string
 *                     country:
 *                       type: string
 *                 billingAddress:
 *                   type: object
 *                   properties:
 *                     street:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     postalCode:
 *                       type: string
 *                     country:
 *                       type: string
 *                 paymentMethod:
 *                   type: string
 *                   enum: [Credit Card, PayPal, Cash on Delivery, Bank Transfer]
 *                 orderNotes:
 *                   type: string
 *                   description: Additional notes related to the order
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/orders/:id",
  passport.authenticate("jwt", { session: false }),
  checkAdminRole,
  getOrderById
);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status
 *     tags: [Orders]
 *     security:
 *       - AdminBearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the order to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Shipped, Delivered, Cancelled]
 *                 description: The new status of the order
 *     responses:
 *       200:
 *         description: Successfully updated the order status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 status:
 *                   type: string
 *       400:
 *         description: Invalid status value
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/orders/:id/status",
  passport.authenticate("jwt", { session: false }),
  checkAdminRole,
  updateOrderStatus
);

export default router;

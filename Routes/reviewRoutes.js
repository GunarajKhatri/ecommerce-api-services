import { Router } from "express";
import passport from "passport";
import {
  addReview,
  deleteReview,
  editReview,
} from "../controllers/productReviewcontroller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Reviews
 *     description: Product review management
 */

/**
 * @swagger
 * /api/products/{productId}/reviews:
 *   post:
 *     summary: Add a review to a product
 *     tags: [Reviews]
 *     security:
 *       - UserBearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: Rating for the product (1-5)
 *               comment:
 *                 type: string
 *                 description: Comment for the product
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: User has already reviewed this product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.post(
  "/products/:productId/reviews",
  passport.authenticate("jwt", { session: false }),
  addReview
);

/**
 * @swagger
 * /api/products/{productId}/reviews/{reviewId}:
 *   put:
 *     summary: Edit a review for a product
 *     tags: [Reviews]
 *     security:
 *       - UserBearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product being reviewed
 *       - name: reviewId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: New rating for the product (1-5)
 *               comment:
 *                 type: string
 *                 description: Updated comment for the product
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       404:
 *         description: Product or review not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/products/:productId/reviews/:reviewId",
  passport.authenticate("jwt", { session: false }),
  editReview
);

/**
 * @swagger
 * /api/products/{productId}/reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review from a product
 *     tags: [Reviews]
 *     security:
 *       - UserBearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *       - name: reviewId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Product or review not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/products/:productId/reviews/:reviewId",
  passport.authenticate("jwt", { session: false }),
  deleteReview
);

export default router;

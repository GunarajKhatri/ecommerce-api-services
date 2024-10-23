import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import cartRoutes from "./cartRoutes.js";
import productRoutes from "./productRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import orderRoutes from "./orderRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import checkoutRoutes from "./checkoutRoutes.js";
const router = Router();

// Auth routes
router.use("/", authRoutes);

// User routes
router.use("/", userRoutes);

// Cart routes
router.use("/", cartRoutes);

// Product routes
router.use("/", productRoutes);

//  Review routes
router.use("/", reviewRoutes);

//  Checkout routes
router.use("/", checkoutRoutes);

// Category routes
router.use("/", categoryRoutes);

// Order routes
router.use("/", orderRoutes);

export default router;

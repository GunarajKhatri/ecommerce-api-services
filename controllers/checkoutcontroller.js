import Product from "../Models/Product.js";
import User from "../Models/User.js";
import Order from "../Models/Order.js";

export const checkoutCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate("cart.items.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get cart items
    const products = user.cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.price,
    }));

    const totalAmount = products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Before creating an order, update product stock
    for (const item of user.cart.items) {
      const product = await Product.findById(item.productId._id);
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for product ${product.name}` });
      }
      product.stock -= item.quantity;
      await product.save();
    }

    // Create an order
    const newOrder = await Order.create({
      user: userId,
      products,
      totalAmount,
      shippingAddress: req.body.shippingAddress,
      billingAddress: req.body.billingAddress,
      paymentMethod: req.body.paymentMethod,
      status: "Pending",
    });

    // Clear cart after checkout
    user.cart.items = [];
    user.cart.cartTotalPrice = 0;
    await user.save();

    // Add order to user's order history
    await User.findByIdAndUpdate(
      userId,
      { $push: { orders: newOrder._id } },
      { new: true }
    );

    res.status(201).json({ message: "Order created successfully!", newOrder });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const checkoutProduct = async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.productId; 
  const { quantity } = req.body; 

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if sufficient stock is available
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Calculate total price
    const totalAmount = product.price * quantity;

    // Create an order
    const newOrder = await Order.create({
      user: userId,
      products: [
        {
          productId: productId,
          quantity: quantity,
          price: product.price,
        },
      ],
      totalAmount: totalAmount,
      shippingAddress: req.body.shippingAddress, // Optional, but necessary if using
      billingAddress: req.body.billingAddress, // Optional, but necessary if using
      paymentMethod: req.body.paymentMethod, // Optional, but necessary if using
      status: "Pending",
    });
    // const user = await User.findById(userId);
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { orders: newOrder._id }, // Correct field name
      },
      { new: true }
    );

    //  Update product stock to reflect the purchase
    product.stock -= quantity;
    await product.save(); // Save the updated stock

    res.status(201).json({ message: "Order created successfully!", newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

import Product from "../Models/Product.js";
import User from "../Models/User.js";

export const addItemToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the item in the cart
    const cartItemIndex = user.cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex > -1) {
      // If item already exists, update quantity
      user.cart.items[cartItemIndex].quantity += quantity;
    } else {
      // If item does not exist, add new item
      user.cart.items.push({ productId, quantity, price: product.price });
    }
    console.log(user.cart.items);
    // Update total cart price
    user.cart.cartTotalPrice = user.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Save updated user document
    const updatedUser = await user.save();

    res.status(200).json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Remove Item from Cart
export const removeItemFromCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the item in the cart
    const cartItemIndex = user.cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex > -1) {
      // Remove item from cart
      user.cart.items.splice(cartItemIndex, 1);

      // Update total cart price
      user.cart.cartTotalPrice = user.cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      // Save updated user document
      const updatedUser = await user.save();

      res.status(200).json(updatedUser.cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getCartItems = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId)
    .populate({
      path: "cart.items.productId",  
      select: "name imageUrl"        
    });
   

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  // Check if any products have been deleted or not found in the database
  const cartItems = user.cart.items.map((item) => {
    if (!item.productId) {
      // If a product no longer exists, remove it or handle it gracefully
      return {
        ...item,
        productId: "Product not available",
      };
    }
    return item;
  });

  res.status(200).json({ items: cartItems, cartTotalPrice: user.cart.cartTotalPrice });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal server error", error });
}
};

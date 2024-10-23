import Order from "../Models/Order.js";

export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
      .populate("user", "username email")
      .populate({
        path: "products.productId",  
        select: "name imageUrl"        
      });
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  };

  export const updateOrderStatus = async (req, res) => {
    const { status } = req.body; 
  
    if (!["Pending", "Shipped", "Delivered", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
  
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true } // Return the updated order
      );
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  };
  export const getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
      .populate("user", "username email")
      .populate({
        path: "products.productId",  // Populating nested productId inside products
        select: "name"         // Selecting specific fields from Product schema
      });
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  };
  

  

import User from "../Models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update User Details
export const updateUser = async (req, res) => {
  const userId = req.user._id; // Get the user ID from the authenticated user
  const { username, email, address } = req.body; // Extract fields to update

  try {
    // Prepare the update object
    const updateData = {};

    // Update user details if provided
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (address) updateData.address = address; // Full address object
    // if (role) {
    //   // Ensure that only admin can change roles, if necessary
    //   if (req.user.role === 'admin') {
    //     updateData.role = role;
    //   } else {
    //     return res.status(403).json({ message: "Only admins can change user roles" });
    //   }
    // }

    // Update the user document
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true, // Validate the data against the schema
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser); // Return the updated user
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const adminUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, address, role } = req.body;

  try {
    const updateData = {};

    // Update user details if provided
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (address) updateData.address = address; // Full address object
    if (role) updateData.role = role; // Admins can update roles

    // Find the user by ID and update their information
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // Validate the data against the schema
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser); // Return the updated user
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getOwnProfile = async (req, res) => {
  try {
    // req.user will have the user's ID, so we use it to find the user
    const user = await User.findById(req.user._id)
      .select("-password -cart -role")
      .populate({
        path: "orders",
        select: "-user", // Exclude the user field from the populated orders
        populate: {
          path: "products.productId", // Populate productId inside products
          select: "name", // Select specific fields from Product
        },
      });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

import Category from "../Models/Category.js";
import Product from "../Models/Product.js";

export const createProduct = async (req, res) => {
  const { name, description, price, stock, imageUrl, category } = req.body;

  try {
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category!" });
    }
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      imageUrl,
      category,
    });

    // Save the product
    const savedProduct = await newProduct.save();

    // Update the category by pushing the product ID into the products array
    await Category.findByIdAndUpdate(
      category,
      { $push: { products: savedProduct._id } },
      { new: true } // Return the updated category
    );

    return res
      .status(201)
      .json({ message: "Product created successfully!", newProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const Products = await Product.find({ isDeleted: false })
      .select("-reviews -isDeleted") // Exclude reviews
      .populate("category", "name") // Include only the category name
      .select("name price stock imageUrl averageRating reviewCount");
    res.status(200).json(Products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id, isDeleted: false })
    .select("-isDeleted")
      .populate("category", "name")
      .populate("reviews.user", "username"); // Include user details in reviews

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, imageUrl, category } = req.body;
  
    try {
      // Find the product by ID
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Keep track of old category for later use
      const oldCategory = product.category;
  
      // Update product details
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.stock = stock || product.stock;
      product.imageUrl = imageUrl || product.imageUrl;
  
      // Update the category only if it has changed
      if (category && category !== product.category.toString()) {
        product.category = category;
  
        // Update old category to remove the product ID
        await Category.findByIdAndUpdate(
          oldCategory,
          { $pull: { products: product._id } },// Removes product ID from the products array fromoldc
          { new: true }
        );
  
        // Update new category to add the product ID
        await Category.findByIdAndUpdate(
          category,
          { $addToSet: { products: product._id } }, //$addToSet to Adds product ID if it doesn't exist(removed uplicates)
          { new: true }
        );
      }
  
      // Save the updated product
      const updatedProduct = await product.save();
  
      res.status(200).json({
        message: "Product updated successfully",
        updatedProduct,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Soft delete the product
    product.isDeleted = true;
    await product.save();

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};



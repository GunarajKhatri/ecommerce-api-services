import Category from "../Models/Category.js";

export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists." });
    }

    const newCategory = await Category.create({
      name,
      description,
    });

    return res
      .status(201)
      .json({ message: "Category created successfully!", newCategory });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getAllCategory = async (req, res) => {
    try {
      const categories = await Category.find().select("-products");
  
      
      if (categories.length === 0) {
        return res.status(404).json({ message: "No categories found" });
      }
  
     
      res.status(200).json({ success: true, categories });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  
  export const getProductsByCategory = async (req, res) => {
    const { categoryName } = req.params; // 
  
    try {
    
      const category = await Category.findOne({ name: categoryName }).populate("products");
  

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      
      res.status(200).json({
        success: true,
        category: {
          name: category.name,
          description: category.description,
          products: category.products,
        },
      });
    } catch (error) {
      
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  
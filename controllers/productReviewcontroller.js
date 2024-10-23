
import Product from "../Models/Product.js";
export const addReview = async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body; // Review data from the request body

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // checking whether review is submitted already or not by req.user
    const existingReview = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product." });
    }

    // Create a new review object
    const review = {
      user: req.user._id, // User ID from the authenticated request
      rating,
      comment,
    };

    // Add the review to the product's reviews array
    product.reviews.push(review);

    // Update the average rating and review count
    product.reviewCount = product.reviewCount + 1;
    product.averageRating = (
      (product.averageRating * (product.reviewCount - 1) + rating) /
      product.reviewCount
    ).toFixed(1); // new average rating=(old total rating + new rating) / total review count

    await product.save();

    res.status(201).json({ message: "Review added successfully!", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  const { productId, reviewId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviewIndex = product.reviews.findIndex(
      (review) => review._id.toString() === reviewId
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Remove the review
    product.reviews.splice(reviewIndex, 1);

    // Update reviewCount
    product.reviewCount = product.reviews.length;

    // Update averageRating
    if (product.reviewCount > 0) {
      const totalRating = product.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      product.averageRating = (totalRating / product.reviewCount).toFixed(1);
    } else {
      product.averageRating = 0; // Reset average if no reviews left
    }

    await product.save();
    res.status(200).json({ message: "Review deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editReview = async (req, res) => {
 
  const { productId, reviewId } = req.params;
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = product.reviews.find(
      (review) => review._id.toString() === reviewId
    );
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Update the review
    review.rating = rating;
    review.comment = comment;

    // Update averageRating
    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    product.averageRating = (totalRating / product.reviewCount).toFixed(1);

    await product.save();
    res.status(200).json({ message: "Review updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

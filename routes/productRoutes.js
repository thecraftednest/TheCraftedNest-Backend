const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected admin routes
router.post('/', protect, upload.single('image'), createProduct);
router.put('/:id', protect, upload.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
const express = require('express');
const router = express.Router();
const { createTestimonial, getTestimonials } = require('../controllers/testimonialController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getTestimonials);

// Protected admin route
router.post('/', protect, createTestimonial);

module.exports = router;
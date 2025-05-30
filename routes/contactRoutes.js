const express = require('express');
const router = express.Router();
const { createMessage, getMessages } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Public route: Contact form submission
router.post('/', createMessage);

// Admin-only: View all messages
router.get('/', protect, getMessages);

module.exports = router;
// This file defines the routes for contact management in the Crafted Nest application.
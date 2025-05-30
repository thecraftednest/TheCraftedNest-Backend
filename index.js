require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

// Import routes
const productRoutes = require("./routes/productRoutes");
const contactRoutes = require('./routes/contactRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Mount routes
app.use("/api/products", productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/auth', authRoutes);

// Test Route
app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "API working fine 🚀" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});





// require("dotenv").config();
// const mongoose = require("mongoose");
// const express = require("express");
// const cors = require("cors");

// // Import routes
// const productRoutes = require("./routes/productRoutes");
// const contactRoutes = require('./routes/contactRoutes');
// const testimonialRoutes = require('./routes/testimonialRoutes');
// const authRoutes = require('./routes/authRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB (only once)
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Mount routes
// app.use("/api/products", productRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/testimonials', testimonialRoutes);
// app.use('/api/auth', authRoutes); // ✅ This enables POST /api/auth/login

// // Test Route
// app.get("/api/test", (req, res) => {
//   res.status(200).json({ message: "API working fine 🚀" });
// });

// // Start server (only once)
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

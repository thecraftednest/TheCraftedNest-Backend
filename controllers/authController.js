const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({
      token: generateToken(admin._id),
      username: admin.username,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get admin profile
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};




// const Admin = require('../models/adminModel');
// const jwt = require('jsonwebtoken');

// // Create JWT token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
// };

// // Admin login
// exports.loginAdmin = async (req, res) => {
//   const { username, password } = req.body;
  
//   try {
//     const admin = await Admin.findOne({ username });
//     if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

//     const isMatch = await admin.matchPassword(password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//     res.json({
//       token: generateToken(admin._id),
//       username: admin.username,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// // Get admin profile
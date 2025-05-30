const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const protect = async (req, res, next) => {
  let token;

  try {
    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get admin from token
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error('JWT Error:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { protect };






///// // authMiddleware.js
// const jwt = require('jsonwebtoken');
// const Admin = require('../models/adminModel');

// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1];

//       if (!token) {
//         return res.status(401).json({ message: 'Token missing after Bearer' });
//       }

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       const admin = await Admin.findById(decoded.id).select('-password');
//       if (!admin) {
//         return res.status(401).json({ message: 'Admin not found from token' });
//       }

//       req.admin = admin;
//       next();
//     } catch (error) {
//       console.error('JWT Verify Error:', error.message);
//       return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   } else {
//     return res.status(401).json({ message: 'No Authorization header or Bearer missing' });
//   }
// };

// module.exports = { protect };

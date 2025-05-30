const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    minlength: 3,
    maxlength: 30
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
});

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  // Password strength validation
  if (this.password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);






// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const adminSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // Password hashing middleware
// adminSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Method to compare password
// adminSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('Admin', adminSchema);
// // This code defines a Mongoose schema for an admin user, including password hashing and comparison methods.
// // It uses bcryptjs for secure password storage and comparison.
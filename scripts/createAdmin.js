require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/adminModel');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const username = 'ashwin'; // ✅ use username instead of email
    const password = 'admin@123'; // plain password

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists');
      return mongoose.disconnect();
    }

    // Create and save new admin (hashing is handled in model)
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    console.log('✅ Admin user created successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    mongoose.disconnect();
  }
};

createAdmin();
// This script connects to the MongoDB database, checks if an admin user already exists,
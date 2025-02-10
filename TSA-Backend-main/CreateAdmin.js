const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Admin credentials
    const username = "TSA_admin";
    const password = "TSA@admin.login";

    // Hash the password
    

    // Save admin
    const admin = new Admin({ username, password});
    await admin.save();

    
    mongoose.disconnect();
  } catch (err) {
    console.error(err.message);
    mongoose.disconnect();
  }
};

createAdmin();
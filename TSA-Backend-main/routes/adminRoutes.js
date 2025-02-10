const express = require("express");
const { loginAdmin } = require("../controllers/Admin");

const router = express.Router();

// Admin Login Route
router.post("/login", loginAdmin);

module.exports = router;

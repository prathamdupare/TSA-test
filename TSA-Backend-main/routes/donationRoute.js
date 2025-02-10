const express = require('express');
const { getAllDonations } = require('../controllers/Donation');
const authMiddleware = require('../middlewares/AdminAuthentication');

const router = express.Router();

// Route to get all donations
router.get('/',authMiddleware, getAllDonations);

module.exports = router;

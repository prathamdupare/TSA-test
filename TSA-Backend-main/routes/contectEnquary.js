const express = require('express');
const router = express.Router();
const { createContactInquiry, getAllInquiries } = require('../controllers/ContectEnquary');
const authMiddleware = require('../middlewares/AdminAuthentication');

// Route to create a contact enquiry
router.post('/enquiry', createContactInquiry);

// Route to get all contact inquiries
router.get('/',authMiddleware, getAllInquiries);


module.exports = router;

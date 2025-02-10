const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authMiddleware = require('../middlewares/AdminAuthentication');



// Route to create a session request
router.post('/', sessionController.createSessionRequest);

// Route to get all session requests
router.get('/',authMiddleware, sessionController.getAllSessionRequests);


module.exports = router;

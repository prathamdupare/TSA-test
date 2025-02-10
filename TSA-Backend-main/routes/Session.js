// routes/sessionRoutes.js
const express = require('express');
const { fetchSession, createSession, deleteSession, updateSession, createSessionRequest } = require('../controllers/sessionController.js');
const router = express.Router();
const multer = require("multer");
const authMiddleware = require('../middlewares/AdminAuthentication.js');

// Route to fetch all sessions
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure "uploads/" directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// Route to create a session
router.post("/",authMiddleware, upload.single("image"), createSession);

// Route to fetch all sessions
router.get('/', fetchSession);

// Route to update a session
router.put('/:id',authMiddleware, upload.single("image"), updateSession);

// Route to delete a session
router.delete('/:id',authMiddleware, deleteSession);




module.exports = router;
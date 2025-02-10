// routes/courseRoutes.js
const express = require('express');
const { fetchSession, createSession} = require('../controllers/sessionController.js');
const router = express.Router();
const multer = require("multer");

// Route to fetch all courses

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure "uploads/" directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.post("/create-session", upload.single("image"), createSession);

router.get('/', fetchSession);


module.exports = router;
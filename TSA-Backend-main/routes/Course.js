const express = require('express');
const router = express.Router();
const { createCourseEnquiry, createCourse, getCourses, getCourseById, updateCourse, deleteCourse, getCourseEnquiries } = require('../controllers/Course');
const authMiddleware = require('../middlewares/AdminAuthentication');
const upload = require('../middlewares/FileUpload');

// Route to create a course enquiry
router.post('/enquiry', createCourseEnquiry);

// CRUD routes for courses
router.post('/', authMiddleware, upload.single('image'), createCourse); // Create a new course
router.get('/', getCourses); // Get all courses
router.get('/enquiry', authMiddleware, getCourseEnquiries); // Delete a course
router.get('/:id', getCourseById); // Get a course by ID
router.put('/:id', authMiddleware, upload.single('image'), updateCourse); // Update a course
router.delete('/:id', authMiddleware, deleteCourse); // Delete a course


module.exports = router;

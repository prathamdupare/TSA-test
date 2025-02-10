const CourseEnquiry = require('../models/CourseEnquiry');
const {sendEnrollmentEmail}  = require('../Email transporter/EmailFuctions')

exports.createCourseEnquiry = async (req, res) => {
  
    const { name, email, mobile, course, price } = req.body;
 
    try {
        const enquiry = new CourseEnquiry({
            studentName: name,
            studentEmail: email,
            studentMobile: mobile.length === 11 ? mobile.slice(1) : mobile.length === 12 ? mobile.slice(2) : mobile,
            courseName: course,
            coursePrice: price.slice(1)
        });

        await enquiry.save();

        // Corrected variable names to match the destructured variables
        sendEnrollmentEmail(email, name, course)

        res.status(201).json({
            success: true,
            message: 'Course enquiry created successfully.',
            enquiry
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating course enquiry.',
            error: error.message
        });
    }
};

const Course = require('../models/Course');

// Function to create a new course
exports.createCourse = async (req, res) => {
    const { name, price, sessions, description } = req.body;
    const image = req.file ? req.file.path : null; // Assuming you're using multer for file uploads

    try {
        const newCourse = new Course({
            name,
            image,
            price,
            sessions,
            description
        });

        await newCourse.save();

        res.status(201).json({
            success: true,
            message: 'Course created successfully.',
            course: newCourse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating course.',
            error: error.message
        });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({
            success: true,
            courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching courses.',
            error: error.message
        });
    }
};

exports.getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found.'
            });
        }
        res.status(200).json({
            success: true,
            course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching course.',
            error: error.message
        });
    }
};

exports.updateCourse = async (req, res) => {
    const { id } = req.params;

    const { title, price, sessions, content } = req.body;
    const image = req.file ? req.file.path : undefined; // Use undefined instead of null if no image is provided

    try {
        const updatedCourse = await Course.findById(id); // First, find the existing course
        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: 'Course not found.'
            });
        }

        // Update only the fields that are provided
        updatedCourse.name = title || updatedCourse.name;
        updatedCourse.price = price || updatedCourse.price;
        updatedCourse.sessions = sessions || updatedCourse.sessions;
        updatedCourse.description = content || updatedCourse.description;

        // Only update the image if a new one is provided
        if (image) {
            updatedCourse.image = image;
        }

        await updatedCourse.save(); // Save the updated course

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: 'Course not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Course updated successfully.',
            course: updatedCourse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating course.',
            error: error.message
        });
    }
};

exports.deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) {
            return res.status(404).json({
                success: false,
                message: 'Course not found.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Course deleted successfully.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting course.',
            error: error.message
        });
    }
};

exports.getCourseEnquiries = async (req, res) => {
    try {
        const enquiries = await CourseEnquiry.find(); // Fetch all course enquiries from the database
        
        return res.status(200).json({
            success: true,
            data: enquiries,
        });
    } catch (error) {
        console.error("Error fetching course enquiries:", error);
        return res.status(500).json({ success: false, message: "Failed to retrieve course enquiries." });
    }
};



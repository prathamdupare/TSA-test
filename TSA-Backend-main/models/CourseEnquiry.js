const mongoose = require('mongoose');

const courseEnquirySchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    studentMobile: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    courseName: {
        type: String,
        required: true
    },
    coursePrice: {
        type: Number,
        required: true
    },
    enquiryDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('CourseEnquiry', courseEnquirySchema);

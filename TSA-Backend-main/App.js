require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");
const bodyParser = require("body-parser");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const sessionRoutes = require("./routes/Session");
const transporter = require('./Email transporter/Transportersetup'); // Import the transporter
const sessionRequest = require('./routes/SessionRequest')
const CourseEnquary = require('./routes/Course');
const ContectEnquary = require('./routes/contectEnquary');
const Donation = require("./routes/donationRoute");




const app = express();
console.log('start')

// Middleware
app.use(cors({
    origin: 'https://demo-tsa.netlify.app' // Allow requests only from this origin
})); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests
app.use(bodyParser.json());


transporter.verify((error, success) => {
    if (error) {
      console.error('Error verifying email transporter:', error);
    } else {
      console.log('Email transporter verified and ready to send emails.');
    }
});
  


app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);




// Serve static files from uploads folder
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/sessionRequest", sessionRequest);
app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/course", CourseEnquary);
app.use("/api/contact", ContectEnquary);
app.use("/api/donations", Donation);



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

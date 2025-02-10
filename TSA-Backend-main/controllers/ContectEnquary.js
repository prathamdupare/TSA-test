const ContactModel = require("../models/ContactModel");

// Function to create a contact inquiry
const createContactInquiry = async (req, res) => {
    const { name, email, number, message } = req.body;

    // Basic validation
    
    if (!name || !email || !number || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    // Create a new inquiry
    const newInquiry = new ContactModel({
        name,
        email,
        phone : number,
        message,
        createdAt: new Date()
    });

    try {
        // Save the inquiry to the database
        await newInquiry.save();

        // Respond with the created inquiry
        return res.status(201).json(newInquiry);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to save inquiry' });
    }
};

const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await ContactModel.find(); // Fetch all inquiries from the database
        
        return res.status(200).json({
            success: true,
            data: inquiries,
        });
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        return res.status(500).json({ success: false, message: "Failed to retrieve inquiries." });
    }
};


// Export the function
module.exports = {
    createContactInquiry,getAllInquiries
};

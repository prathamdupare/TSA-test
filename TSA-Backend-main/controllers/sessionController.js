// controllers/courseController.js
const Session = require('../models/Session');
const SessionRequest = require('../models/SessionRequests')
const {sendSessionNotificationEmail} = require('../Email transporter/EmailFuctions')

// Fetch all courses

const fetchSession = async (req, res) => {
  try {
    const session = await Session.find(); // Fetch all Session
    res.status(200).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch course', error });
  }
};

const createSession = async (req, res) => {
    try {
        const { name, price, sessions, description, selfHelpCredit } = req.body; // Expecting an array of Session in the request body

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const Image = req.file.path;

        const newSession = new Session({ name, price, sessions, description, selfHelpCredit, Image });

        await newSession.save();

        res.status(201).json({ message: "Session created successfully", newSession });

    } catch (err) {
        console.error("Error processing Session:", err.message);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const updateSession = async (req, res) => {
  
    try {
       // Get session ID from request parameters
        const { id, title,type, price, sessions, content, selfHelpCredit } = req.body;

        const updatedSession = await Session.findByIdAndUpdate(id, { name: title, price,type, sessions, description: content, selfHelpCredit, Image: req.file ? req.file.path : undefined }, { new: true });

        if (!updatedSession) {
            return res.status(404).json({ message: "Session not found" });
        }

        res.status(200).json({ message: "Session updated successfully", updatedSession });

    } catch (err) {
        console.error("Error updating Session:", err.message);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const deleteSession = async (req, res) => {
    try {
        const { id } = req.params; // Get session ID from request parameters

        const deletedSession = await Session.findByIdAndDelete(id);

        if (!deletedSession) {
            return res.status(404).json({ message: "Session not found" });
        }

        res.status(200).json({ message: "Session deleted successfully" });

    } catch (err) {
        console.error("Error deleting Session:", err.message);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


const createSessionRequest = async (req, res) => {
  
  try {
   
    const { name, email, mobile, session, price, amount, receipt,currency } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !session || !price || !amount || !currency) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const orderId = `ORDER-${Date.now()}-${Math.floor(Math.random() * 10000)}`; // Generate a unique order ID

    // Check if the session exists
    const findedsession = await Session.findById(session);
    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found." });
    }

    const sessionRequest = new SessionRequest({
      name,
      email,
      mobile,
      session,
      price,
      paymentMode: 'Offline',
      amount,
      receipt,
      orderId,
      status: "cancle", // Set status to confirm for offline payment
    });

    await sessionRequest.save();


    

    sendSessionNotificationEmail(email, name, findedsession);

    res.status(201).json({
      success: true,
      message: "Session request created successfully.",
      sessionRequest,
    });
  } catch (error) {
    console.error("Error creating session request:", error.message);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

const getAllSessionRequests = async (req, res) => {
  try {
    const sessionRequests = await SessionRequest.find().populate('session');
    
    res.status(200).json({
      success: true,
      data: sessionRequests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve session requests.",
    });
  }
};





  
module.exports = { getAllSessionRequests, createSession,deleteSession,updateSession, fetchSession, createSessionRequest };

// Fetch a specific course by ID


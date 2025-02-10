const Razorpay = require("razorpay");
const Donation = require('../models/Donation')
const SessionRequest = require("../models/SessionRequests")
const Session = require("../models/Session")

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    
    const { type, amount, currency, receipt, donerName, donerEmail, donerMobile } = req.body;

    if (type === 'Session booking') {
      // Check if the session exists
      const session = await Session.findById(req.body.session); // Assuming sessionId is passed in the request body
      if (!session) {
        return res.status(404).json({ success: false, message: "Session not found." });
      }

      const options = {
        amount: session.price * 100, // Use session price in paise
        currency: currency || "INR",
        receipt: receipt || `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
     
      const sessionRequest = new SessionRequest({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        orderId: order.id,
        session: session._id,
        price: session.price,
        amount: session.price,
        currency,
        receipt: receipt || `receipt_${Date.now()}`, // Adding receipt field
      });

      await sessionRequest.save();

      res.status(201).json({
        success: true,
        orderId: order.id,
        amount: options.amount,
        currency: options.currency,
      });
    } else {
      // Handle donation creation if type is not 'Session booking'
      const options = {
        amount: amount * 100, // Amount in paise
        currency: currency || "INR",
        receipt: receipt || `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);

      const donation = new Donation({
        amount,
        currency,
        donerName,
        donerEmail,
        donerMobile,
        orderId: order.id,
        receipt,
      });

      await donation.save();

      res.status(201).json({
        success: true,
        orderId: order.id,
        amount: options.amount,
        currency: options.currency,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Order creation failed." });
  }
};

const crypto = require("crypto");
const donation = require('../models/Donation')
const sessionRequest = require('../models/SessionRequests')
const {sendSessionNotificationEmail, sendPaymentConfirmationEmail} = require('../Email transporter/EmailFuctions')

exports.verifyPayment = async(req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    

    // Generate expected signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      const updatedDonation = await donation.findOneAndUpdate(
        { orderId: razorpay_order_id }, // Find by orderId
        { status: 'confirm' }, // Update confirm field to 'confirm'
        { new: true } // Return the updated document
      );

      const updatedSessionRequest = await sessionRequest.findOneAndUpdate(
        { orderId: razorpay_order_id }, // Find by orderId
        { status: 'confirm' }, // Update confirm field to 'confirm'
        { new: true } // Return the updated document
      ).populate('session');

      if (!updatedDonation && !updatedSessionRequest) {
        return res.status(404).json({
          message: 'No donation or session request found with the provided orderId.',
        });
      }

      if(updatedSessionRequest){
    
        sendSessionNotificationEmail(updatedSessionRequest.email, updatedSessionRequest.name, updatedSessionRequest.session);
        sendPaymentConfirmationEmail(updatedSessionRequest.email, updatedSessionRequest.name, "Session booking", updatedSessionRequest.amount)
      }

      if(updatedDonation && updatedDonation.donerEmail !== "Unknown"){
        sendPaymentConfirmationEmail(updatedDonation.donerEmail, updatedDonation.donerName, "Donation", updatedDonation.amount)
      }


      res.status(200).json({ success: true, message: "Payment verified successfully." });
    } else {
      const updatedDonation = await donation.findOneAndUpdate(
        { orderId: razorpay_order_id }, // Find by orderId
        { status: 'cancle' }, // Update confirm field to 'confirm'
        { new: true } // Return the updated document
      );
    
      if (!updatedDonation) {
        return res.status(404).json({
          message: 'Donation not found with the provided orderId.',
        });
      }
      res.status(400).json({ success: false, message: "Invalid payment signature." });
    }
  } catch (error) {
    console.log(error);
    
    const updatedDonation = await donation.findOneAndUpdate(
      { orderId: razorpay_order_id }, // Find by orderId
      { status: 'cancle' }, // Update confirm field to 'confirm'
      { new: true } // Return the updated document
    );

    const updatedSessionRequest = await sessionRequest.findOneAndUpdate(
      { orderId: razorpay_order_id }, // Find by orderId
      { status: 'cancle' }, // Update confirm field to 'confirm'
      { new: true } // Return the updated document
    );
  
    if (!updatedDonation && !updatedSessionRequest) {
      return res.status(404).json({
        message: 'Donation not found with the provided orderId.',
      });
    }
    res.status(500).json({ success: false, message: "Payment verification failed." });
  }
};






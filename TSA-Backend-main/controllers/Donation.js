const Donation = require('../models/Donation');

exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json({
      success: true,
      data: donations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve donations.",
    });
  }
};

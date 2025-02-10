const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
    enum: ['INR', 'USD', 'EUR', 'GBP', 'AUD'], // Add other currencies as needed
    default: 'INR',
  },
  donerName: {
    type: String,
    default: 'Unknown',
  },
  donerEmail: {
    type: String,
    default: 'Unknown',
  },
  donerMobile: {
    type: String,
    default: '0000000000',
    },
    orderId: {
        type: String,
        required: true,
        unique: true, // Ensures orderId is unique
    },
    status: {
        type: String,
        enum: ["confirm", "cancle"],
        default: "cancle"
    },
  receipt: {
    type: String,
    unique: true, // Ensures each receipt is unique
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
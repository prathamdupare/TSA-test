const mongoose = require('mongoose');

const SessionRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    default: '0000000000', // Default value for mobile
  },
  paymentMode: {
    type: String,
    enum: ['Online','Offline'],
    default: 'Online'
  },
  type: {
    type: String,
    enum: ['Session booking'],
    default: 'Session booking',
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session', // Reference to the Session model
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
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
  status: {
    type: String,
    enum: ["confirm", "cancle"],
    default: "cancle"
    },
  receipt: {
    type: String,
    unique: true, // Ensures each receipt is unique
  },
  orderId: {
    type: String,
    unique: true, // Ensures orderId is unique
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SessionRequest', SessionRequestSchema);


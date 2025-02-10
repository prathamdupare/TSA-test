const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Image: {type: String, require: true}, 
  price: { type: Number, required: true },
  sessions: { type: Number, required: true },
  description: { type: String, required: true },
  selfHelpCredit: { type: Number, default: 0 },
  type: {
    type: String,
        enum: ["Individual","Couple"],
        default: "Individual"
  }
});

module.exports = mongoose.model('Session', SessionSchema);
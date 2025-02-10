const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    Img: {type: String, required: true},
  content: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "Donations",
      "Educations",
      "Fundraising",
      "Foods",
      "Medical Help",
      "Water Support",
    ],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", BlogSchema);

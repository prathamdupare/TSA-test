const express = require("express");
const { verifyPayment } = require("../controllers/paymentController");

const router = express.Router();

router.post("/verify", verifyPayment);

module.exports = router;

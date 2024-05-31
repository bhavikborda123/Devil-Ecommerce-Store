const router = require("express").Router();

const RazorpayController = require("./../controller/razorpay");


router.get("/create-order", RazorpayController.generateOrder);
router.post("/paymentProcess", RazorpayController.paymentProcess);


module.exports = router;
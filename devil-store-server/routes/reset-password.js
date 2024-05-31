const router = require("express").Router();
const resetPasswordController = require("../controller/reset-password");


router.post("/sent-otp", resetPasswordController.sendOtp);
router.post("/verify-otp", resetPasswordController.verifyOTP);
router.post("/reset-password", resetPasswordController.resetPassword);

module.exports = router;
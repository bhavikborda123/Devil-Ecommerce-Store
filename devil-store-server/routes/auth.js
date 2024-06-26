const router = require("express").Router();
const authController = require("../controller/auth");


router.post("/signup", authController.postSignup);
router.post("/signin", authController.postSignin);

module.exports = router;
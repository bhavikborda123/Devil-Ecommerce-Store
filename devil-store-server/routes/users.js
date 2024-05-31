const router = require("express").Router();
const usersController = require("../controller/users");

router.get("/all-user", usersController.getAllUser);
router.post("/single-user", usersController.getSingleUser);
router.post("/edit-user", usersController.postEditUser);
router.post("/delete-user", usersController.getDeleteUser);
router.get("/verify-user", usersController.verifyUser);

router.post("/change-password", usersController.changePassword);

module.exports = router;

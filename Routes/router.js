const express = require("express");
const router = new express.Router();
const controller = require('../controllers/userControllers');
const upload = require('../multerConfig/storageConfig')

// routes
router.post("/user/register",upload.single("user_profile"),controller.userpost);
router.get("/user/details", controller.userget);
router.get("/user/:id",controller.singleuserget);

module.exports = router
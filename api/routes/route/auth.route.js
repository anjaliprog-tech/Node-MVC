const express = require("express");
const router = express.Router();
const {validator} = require("../../helpers/validator.helper");
const authController = require("../../controllers/auth.controller");
const authValidation = require("../../validations/auth.validation");

router.post("/register", validator.body(authValidation.registerEmail), authController.signUpEmail);
router.post("/register-email", validator.body(authValidation.registerMobile), authController.signUpMobile);
router.post("/send-sms", authController.sendSMS);
router.post("/login", validator.body(authValidation.login), authController.login);

module.exports = router;
const express = require("express");
const router = express.Router();
const {validator} = require("../../helpers/validator.helper");
const authController = require("../../controllers/auth.controller");
const authValidation = require("../../validations/auth.validation");

router.post("/register", validator.body(authValidation.register), authController.signUp);

module.exports = router;
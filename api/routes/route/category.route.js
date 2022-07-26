const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/category.controller");

router.get("/getCategory", categoryController.getCategory);

module.exports = router;
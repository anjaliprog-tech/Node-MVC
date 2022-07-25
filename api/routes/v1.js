let express = require("express");
let router = express.Router();
let path = require('path');

/**
 * Import Route Files
 */
let auth = require("./route/auth.route");
let category = require("./route/category.route");
/**
 * Routes - Mobile Application
 */

router.use("/auth", auth);
router.use("/category", category);
/**
 * Routes - Admin 
*/

module.exports = router;
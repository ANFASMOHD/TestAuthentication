const express = require("express");
const router = express.Router();
const protect = require("../MiddleWare/authmiddleware");
const { getAllStudentsWithDetails } = require("../controllers/getUserFullDetails");



router.get("/", protect,getAllStudentsWithDetails );

module.exports = router;

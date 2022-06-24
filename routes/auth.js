const express = require("express");
const router = express.Router();
const { getTweets } = require("../controllers/auth");

router.get("/tweets", getTweets);

module.exports = router;
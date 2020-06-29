const express = require("express");
const router = express.Router();
const { getRecords } = require("../controllers/data");

router.route("/").get(getRecords);

module.exports = router;

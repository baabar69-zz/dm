const express = require("express");
const router = express.Router();
const { getRecords, getFilteredRecords } = require("../controllers/data");

router.route("/").get(getFilteredRecords);

router.route("/all").get(getRecords);

module.exports = router;

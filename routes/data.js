const express = require("express");
const router = express.Router();
const {
    getBootcamps,
} = require("../controllers/data");

router
.route("/")
.get(getBootcamps)


module.exports = router;

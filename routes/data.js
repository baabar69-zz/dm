const express = require("express");
const router = express.Router();
const {
  getRecords,
  getFilteredRecords,
  getSingleRecord,
  createRecords,
  editRecord,
  deleteRecod,
} = require("../controllers/data");

router.route("/").get(getFilteredRecords).post(createRecords);
router.route("/:name/:uid").get(getSingleRecord);
router.route("/:id").put(editRecord).delete(deleteRecod);

router.route("/all").get(getRecords);

module.exports = router;

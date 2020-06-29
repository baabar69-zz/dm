const Data = require("../models/data");

//@desc     Get all records
//@route    GET /api/v1/records
//@access   Public
exports.getRecords = async (req, res, next) => {
  try {
    const records = await Data.find();
    res
      .status(200)
      .json({ status: true, totalRecords: records.length, data: records });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

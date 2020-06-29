const Data = require('../models/data');


//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = async (req, res, next) => {
  try {
    console.log(req.query);
    const bootcamps = await Data.find(req.query);
    res.status(200).json({ status: true, data: bootcamps });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

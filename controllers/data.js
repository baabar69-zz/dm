const Data = require("../models/data");

//@desc     Get all records
//@route    GET /api/v1/records/all
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

//@desc     Get filtered records with pagination
//@route    GET /api/v1/records?select=company&page=1&limit=4
//@access   Public
exports.getFilteredRecords = async (req, res, next) => {
  try {
    let query;

    const reqQeury = { ...req.query };

    const removeFields = ["select", "page", "limit"];

    removeFields.forEach((param) => delete reqQeury[param]);

    let queryStr = JSON.stringify(reqQeury);

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    // console.log(queryStr);
    query = Data.find(JSON.parse(queryStr));

    //To select only title and textContent OR title and tags.
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      //   console.log(fields);
      query = query.select(fields);
    }

    //Default Values for Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 4;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Data.countDocuments();

    query = query.skip(startIndex).limit(limit);

    //If all the results are showing in one request Pagination will eb an empty object
    const pagination = {};

    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    const record = await query;
    res.status(200).json({
      status: true,
      count: record.length,
      pagination,
      data: record,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

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

//@desc     Get single record
//@route    GET /api/v1/records/:id
//@access   Public
exports.getSingleRecord = async (req, res, next) => {
  try {
    let name = req.params.name.split(" ");
    name = name[0];

    let uid = "";
    uid = req.params.uid;
    uid = uid.replace(/[^\w\s]/gi, "");
    uid = uid.replace(/\s/g, "");
    uid = uid.substring(0, 10);

    const records = await Data.find({
      company: { $regex: name, $options: "i" },
      uid: uid,
    });
    if (records.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No records found" });
    }
    res.status(200).json({
      status: true,
      get: true,
      totalRecords: records.length,
      data: records,
    });
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

//@desc     Find a record
//@route    POST /api/v1/records
//@access   Public
exports.createRecords = async (req, res, next) => {
  try {
    let uidName = "";
    let tempName = req.body.company;
    tempName = tempName.split(" ");
    for (let i = 0; i < tempName.length; i++) {
      if (tempName[i] !== "") {
        uidName = tempName[i];
        break;
      }
    }

    let uid = "";
    uid = req.body.phone;
    uid = uid.replace(/[^\w\s]/gi, "");
    uid = uid.replace(/\s/g, "");

    req.body["uidName"] = uidName;
    req.body["uid"] = uid;
    const data = await Data.create(req.body);

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc      Update a Record
// @route     PUT /api/v1/records/:id
// @access    Public
exports.editRecord = async (req, res, next) => {
  try {
    let data = await Data.findById(req.params.id);
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "Not found the record" });
    }

    data = await Data.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// @desc      Delete a Record
// @route     DELTE /api/v1/records/:id
// @access    Public
exports.deleteRecod = async (req, res, next) => {
  try {
    let data = await Data.findById(req.params.id);
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "Not found the record" });
    }

    data.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

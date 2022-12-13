const express = require("express");
const router = express.Router();

const {
  getAllJobTypesStatic,
  getAllJobTypes,
  job_type_detail,
  jobtype_create_post,
} = require("../controllers/jobTypeController");

// GET request for creating a Job Type.

// POST request for creating Job Type.
router.route("/create").post(jobtype_create_post);
// GET request to delete Job Type.
// POST request to delete Job Type.
// GET request to update Job Type.
// POST request to update Job Type.

// GET request for one Job Type.
router.route("/:id").get(job_type_detail);
// GET request for list of all Job Type items.
router.route("/").get(getAllJobTypes);
router.route("/static").get(getAllJobTypesStatic);

module.exports = router;

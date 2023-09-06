const express = require("express");
const router = express.Router();
const followController = require("../controllers/followController");

router.post("/add-follow", followController.addFollow);
router.post("/remove-follow", followController.removeFollow);
router.post("/fetch-follow-status", followController.fetchFollowStatus);

module.exports = router;

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { addLiked, getAllLiked, getOneLiked, removeOneLiked } = require("../controllers/likedController");

router.route("/liked").post(protect, addLiked);
router.route("/liked").get(protect, getAllLiked);

router.route("/liked/:id").get(protect, getOneLiked);
router.route("/liked/:id").delete(protect, removeOneLiked);


module.exports = router;

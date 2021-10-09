const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { addToCollection, getAllCollection, getOneCollection, removeFromCollection, deleteOneCollection } = require("../controllers/likedController");

router.route("/colletions").get(protect, getAllCollection);

router.route("/colletions/:id").get(protect, getOneCollection);
router.route("/colletions/:id").post(protect, addToCollection);
router.route("/colletions/:id").patch(protect, removeFromCollection);
router.route("/colletions/:id").delete(protect, deleteOneCollection);


module.exports = router;
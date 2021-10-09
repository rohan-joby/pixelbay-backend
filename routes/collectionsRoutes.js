const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { addToCollection, getAllCollection, addNewCollection, getOneCollection, removeFromCollection, deleteOneCollection } = require("../controllers/collectionsController");

router.route("/collections").get(protect, getAllCollection);
router.route("/collections").post(protect, addNewCollection);

router.route("/collections/:id").get(protect, getOneCollection);
router.route("/collections/:id").post(protect, addToCollection);
router.route("/collections/:id").patch(protect, removeFromCollection);
router.route("/collections/:id").delete(protect, deleteOneCollection);


module.exports = router;
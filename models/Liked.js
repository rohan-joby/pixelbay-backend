const mongoose = require("mongoose");

const LikedSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
});

const Liked = new mongoose.model("Liked", LikedSchema);

module.exports = Liked;

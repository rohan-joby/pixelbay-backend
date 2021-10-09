const mongoose = require("mongoose");

const CollectionsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  images: [
    {
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
    },
  ],
});

const Collections = new mongoose.model("Collections", CollectionsSchema);

module.exports = Collections;

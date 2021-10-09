const mongoose = require("mongoose");

const CollectionsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: [
    {
      id: {
        type: String,
      },
      url: {
        type: String,
      },
      username: {
        type: String,
      },
      name: {
        type: String,
      },
      link: {
        type: String,
      },
    },
  ],
});

const Collections = new mongoose.model("Collections", CollectionsSchema);

module.exports = Collections;

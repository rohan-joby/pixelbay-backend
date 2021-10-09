const Liked = require("../models/Liked");
const ErrorResponse = require("../utils/ErrorResponse");

exports.addLiked = async (req, res, next) => {
  const { id, url, username, name, link } = req.body;
  const userId = req.user.id;
  try {
    const liked = await Liked.create({ id, url, username, name, link, userId });
    console.log("new",liked);
    const updatedLiked = await Liked.find({ userId: userId });
    res.status(201).json({ success: true, message: "Note added successfully", liked:updatedLiked });
  } catch (error) {
    next(error);
  }
};

exports.getAllLiked = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const allLiked = await Liked.find({ userId: userId });
    if (!allLiked) {
      next(new ErrorResponse("No liked images found", 404));
    }
    res.status(200).json({ success: true, message: allLiked });
  } catch (error) {
    next(error);
  }
};

exports.getOneLiked = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const liked = await Liked.findOne({ id: id, userId: userId });
    if (!liked) {
      next(new ErrorResponse("Liked image not found", 404));
    }
    res.status(200).json({ success: true, message: liked });
  } catch (error) {
    next(error);
  }
};

exports.removeOneLiked = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const deletion = await Liked.deleteOne({ id: id, userId: userId });
    const updatedLiked = await Liked.find({ userId: userId });
    console.log("removal",updatedLiked);
    res
      .status(200)
      .json({ success: true, message: "Liked image deleted successfully", liked:updatedLiked });
  } catch (error) {
    next(error);
  }
};

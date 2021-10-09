const Collections = require("../models/Collections");
const ErrorResponse = require("../utils/ErrorResponse");

exports.getAllCollection = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const allCollections = await Collections.find({ userId: userId });
    if (!allCollections) {
      next(new ErrorResponse("No collections found", 404));
    }
    res.status(200).json({ success: true, message: allCollections });
  } catch (error) {
    next(error);
  }
};

exports.getOneCollection = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const collections = await Collections.findOne({ _id: id, userId: userId });
    if (!collections) {
      next(new ErrorResponse("Collection not found", 404));
    }
    res.status(200).json({ success: true, message: collections });
  } catch (error) {
    next(error);
  }
};

exports.addToCollection = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;
  const {image} = req.body;
  try {
    const collections = await Collections.update(
      { _id: id, userId: userId },
      { $push: { "images": image } }
    );
    res
      .status(200)
      .json({ success: true, message: "Liked image deleted successfully", collections:collections});
  } catch (error) {
    next(error);
  }
};

exports.removeFromCollection = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;
  const { imageId } = req.body;
  try {
    const collections = await Collections.update(
      { _id: id, userId: userId },
      { $pull: { "images.id": imageId } }
    );
    res
      .status(200)
      .json({ success: true, message: "Liked image deleted successfully", collections:collections });
  } catch (error) {
    next(error);
  }
};

exports.deleteOneCollection = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const collections = await Collections.deleteOne(
      { _id: id, userId: userId },
      { $pull: { "images.id": imageId } }
    );
    res
      .status(200)
      .json({ success: true, message: "Liked image deleted successfully", collections:collections });
  } catch (error) {
    next(error);
  }
};

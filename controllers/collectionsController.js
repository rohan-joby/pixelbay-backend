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

exports.addNewCollection = async (req, res, next) => {
  const userId = req.user.id;
  const { name, description} = req.body;
  try {
    const newCollection = await Collections.create({ userId: userId, name, description });
    // if (!allCollections) {
    //   next(new ErrorResponse("No collections found", 404));
    // }
    const collection = await Collections.findOne({ _id: id, userId: userId });
    res.status(200).json({ success: true, message: newCollection, collections: collection });
  } catch (error) {
    next(error);
  }
};

exports.getOneCollection = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const collection = await Collections.findOne({ _id: id, userId: userId });
    if (!collection) {
      next(new ErrorResponse("Collection not found", 404));
    }
    res.status(200).json({ success: true, message: collection });
  } catch (error) {
    next(error);
  }
};

exports.addToCollection = async (req, res, next) => {
  const userId = req.user.id;
  const collectionId = req.params.id;
  const { id, url, username, name, link } = req.body;
  try {
    const collections = await Collections.updateOne(
      { _id: collectionId, userId: userId },
      { $push: { images: { id, url, username, name, link } } },
      { upsert: true, setDefaultsOnInsert: true }
    );
    const collection = await Collections.findOne({ _id: id, userId: userId });
    res.status(200).json({
      success: true,
      message: "image added to collection successfully",
      collections: collection,
    });
  } catch (error) {
    next(error);
  }
};

exports.removeFromCollection = async (req, res, next) => {
  const userId = req.user.id;
  const collectionId = req.params.id;
  const { imageId } = req.body;
  try {
    const collections = await Collections.update(
      { _id: collectionId, userId: userId },
      { $pull: { "images.id": imageId } }
    );
    const collection = await Collections.findOne({ _id: id, userId: userId });
    res.status(200).json({
      success: true,
      message: "image removed from collection successfully",
      collections: collection,
    });
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
    res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
      collections: collections,
    });
  } catch (error) {
    next(error);
  }
};

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
  const { name, description } = req.body;
  try {
    const existingCollection = await Collections.exists({
      userId: userId,
      name: name,
    });
    if (existingCollection) {
      return next(new ErrorResponse("Duplicate collection", 422));
    }
    const newCollection = await Collections.create({
      userId: userId,
      name,
      description,
    });
    const collection = await Collections.find({ userId: userId });
    res
      .status(200)
      .json({ success: true, message: newCollection, collections: collection });
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
      { $push: { images: { id, url, username, name, link } } }
    );
    const collection = await Collections.find({ userId: userId });
    res.status(200).json({
      success: true,
      message: "image added to collection successfully",
      collections: collection,
      updated: collections,
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
    const collections = await Collections.updateOne(
      { _id: collectionId, userId: userId },
      { $pull: { images: {id:imageId} } }
    );
    const collection = await Collections.find({ userId: userId });
    res.status(200).json({
      success: true,
      message: "image removed from collection successfully",
      collections: collection,
    });
    console.log("updated collection",collection);
  } catch (error) {
    next(error);
  }
};

exports.deleteOneCollection = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const deletion = await Collections.deleteOne({ _id: id, userId: userId });
    const collections = await Collections.find({ userId: userId });
    res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
      collections: collections,
    });
  } catch (error) {
    next(error);
  }
};

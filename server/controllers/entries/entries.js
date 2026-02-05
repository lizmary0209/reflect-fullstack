const Entry = require("../../models/Entry");

const createError = (statusCode, message) => ({ statusCode, message });

module.exports.getEntries = async (req, res, next) => {
  try {
    const entries = await Entry.find({ owner: req.user._id }).sort({ createdAt: -1 });
    return res.send(entries);
  } catch (err) {
    return next(err);
  }
};

module.exports.createEntry = async (req, res, next) => {
  try {
    const { title, body, mood, tags } = req.body;

    const entry = await Entry.create({
      title,
      body,
      mood,
      tags,
      owner: req.user._id,
    });

    return res.status(201).send(entry);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(createError(400, "Validation error"));
    }

    return next(err);
  }
};

module.exports.getEntryById = async (req, res, next) => {
  try {
    const entry = await Entry.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!entry) {
      return next(createError(404, "Entry not found"));
    }

    return res.send(entry);
  } catch (err) {
    if (err.name === "CastError") {
      return next(createError(400, "Invalid entry id"));
    }

    return next(err);
  }
};

module.exports.updateEntry = async (req, res, next) => {
  try {
  const updatedEntry = await Entry.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEntry) {
      return next(createError(404, "Entry not found"));
    }

    return res.send(updatedEntry);
  } catch (err) {
    if (err.name === "CastError") {
      return next(createError(400, "Invalid entry id"));
    }

    if (err.name === "ValidationError") {
      return next(createError(400, "Validation error"));
    }

    return next(err);
  }
};

module.exports.deleteEntry = async (req, res, next) => {
  try {
  const deletedEntry = await Entry.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!deletedEntry) {
      return next(createError(404, "Entry not found"));
    }

    return res.send({ message: "Entry deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      return next(createError(400, "Invalid entry id"));
    }

    return next(err);
  }
};


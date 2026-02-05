const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 100,
            trim: true,
        },
        body: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 5000,
            trim: true,
        },
        mood: {
            type: String,
            enum: ["calm", "grateful", "anxious", "joyful", "sad", "angry", "neutral"],
            default: "neutral",
        },
        tags: {
            type: [String],
            default: [],
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Entry", entrySchema);
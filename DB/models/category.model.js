import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Category = mongoose.model("Category", CategorySchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Users = require("./User.model");

const blogSchema = new Schema(
  {
   createdBy: { type: Schema.Types.ObjectId, ref: "Users" },
    htmlData: { type: String, required: false },
    like: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    created_date: { type: Date, default: Date.now },
  },
  { versionKey: false }
);
const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;

  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Blog = require("./Blog.model");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String, required: false },
    tags: { type: String, required: false },
    description: { type: String, required: false },
    bookmark: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    type: { type: String, required: true },
    password: { type: String, required: true },
    register_date: { type: Date, default: Date.now },
    follower: [{ type: Schema.Types.ObjectId, ref: "Users"  }],
    following: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  { versionKey: false }
);
userSchema.statics.search = async function (searchText) {
  const searchRegex = new RegExp(searchText, "i"); // Case-insensitive search
  return this.find({
    $or: [
      { name: searchRegex },
      { email: searchRegex },
      { tags: { $in: [searchRegex] } },
    ],
  })
    .select(
      "-phone -email -emailNotification -profileImage -tags -description -bookmark -password -register_date -follower -following"
    )
    .limit(10)
    .exec();
};
userSchema.statics.searchAll = async function (searchText) {
  const searchRegex = new RegExp(searchText, "i"); // Case-insensitive search
  return this.find({
    $or: [
      { name: searchRegex },
      { email: searchRegex },
      { tags: { $in: [searchRegex] } },
    ],
  })
    .select(
      "-phone -emailNotification -bookmark -password -register_date -follower -following"
    )
    .exec();
};

module.exports = mongoose.model("Users", userSchema);
 
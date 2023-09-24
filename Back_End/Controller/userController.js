const User = require("../models/User.model");
const DEBUG = process.env.DEBUG;
const logger = require("../Config/Logger");
const Blog = require("../models/Blog.model");

const getProfile = async (req, res) => {
  const userId = req?.user?.id;
  // Retrieve user profile data from the database using the user ID
  if (DEBUG) {
    console.log("Get Profile Function Start");
  }
  try {
    const userProfile = await User.findById(userId).select(
      "-type  -password -register_date"
    );
    res.json({ profile: userProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};
const getProfileById = async (req, res) => {
  const userId = req?.params?.id;
  // Retrieve user profile data from the database using the user ID
  if (DEBUG) {
    console.log("Get Profile Function Start");
  }
  try {
    let userProfile = await User.findById(userId).select(
      "-type  -password -register_date"
    );
    const count = await Blog.countDocuments({ createdBy: req?.params?.id });
    userProfile = userProfile.toObject();
    userProfile.follower = userProfile.follower.length;
    userProfile.following = userProfile.following.length;
    userProfile.post = count;
    res.json({ profile: userProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user.id;
  // Retrieve user profile data from the database using the user ID
  if (DEBUG) {
    console.log("Get Profile Function Start");
  }
  try {
    const userProfile = await User.findById(userId).select(
      "-type  -password -register_date"
    );
    if (req.user.id != userProfile._id) {
      return res.status(403).json({ msg: "Unauthorized Access" });
    }
    userProfile.name = req?.body?.name;
    userProfile.tags = req?.body?.tags;
    userProfile.description = req?.body?.description;
    userProfile.save();
    res.json({ profile: userProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const myBlog = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the parameter is passed as a query parameter (e.g., /bestStories?userId=123)
    console.log("🚀 ~ file: userController.js:51 ~ myBlog ~ userId:", userId);

    // Check if the user ID parameter exists and is a valid MongoDB ObjectId

    const bestBlog = await Blog.find({ createdBy: userId })
      .sort({ like: -1 })
      .select("imageUrl heading description _id tagLine -createdBy")
      .populate({
        path: "createdBy",
        select: "-email -register_date -type -password",
      })
      .exec();

    res.status(200).json({ data: bestBlog });
  } catch (error) {
    console.log(`Error in Best Stories controller ${error}`);
    res.status(500).json({ error: `${error}` });
  }
};
const myBlogById = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the parameter is passed as a query parameter (e.g., /bestStories?userId=123)
    console.log("🚀 ~ file: userController.js:51 ~ myBlog ~ userId:", userId);

    // Check if the user ID parameter exists and is a valid MongoDB ObjectId

    const bestBlog = await Blog.find({ createdBy: userId })
      .sort({ like: -1 })
      .select("imageUrl heading description _id tagLine -createdBy")
      .populate({
        path: "createdBy",
        select: "-email -register_date -type -password",
      })
      .exec();
    res.status(200).json({ data: bestBlog });
  } catch (error) {
    console.log(`Error in Best Stories controller ${error}`);
    res.status(500).json({ error: `${error}` });
  }
};

const likeMyBlog = async (req, res) => {
  logger.log("like my blog function start");
  try {
    const blogId = req?.params?.id;
    console.log(
      "🚀 ~ file: userController.js:76 ~ likeMyBlog ~ blogId:",
      blogId
    );

    const likeBlog = await Blog.findById(blogId);
    if (req.body.like) {
      let newArray = array.filter((item) => item !== req?.user?.id);
      likeBlog.like = newArray;
    } else {
      likeBlog.like.push(req?.user?.id);
    }
    likeBlog.save();
    return res.status(200).json({ data: "Blog Liked" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
const BookMarkMyBlog = async (req, res) => {
  try {
    const blogId = req?.params?.id;
    const userDocs = await User.findById(req.user.id);
    userDocs.bookmark.push(blogId);
    userDocs.save();
    return res.status(200).json({ data: "Added To Bookmark" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
const startChat = async (req, res) => {
  logger.log("like my start Chat function start");
  // try {
  //   const userId = req?.params?.id;
  //   if (!userId) {
  //     return res.status(400), json({ msg: "Invalid Data]" });
  //   }
  //   var isChat = await Chat.find({
  //     isGroupChat: false,
  //     $and: [
  //       { users: { $elemMatch: { $eq: req.user.id } } },
  //       { users: { $elemMatch: { $eq: userId } } },
  //     ],
  //   })
  //     .populate("users", "-password")
  //     .populate("latestMessage");

  //   isChat = await User.populate(isChat, {
  //     path: "latestMessage.sender",
  //     select: "name pic email",
  //   });

  //   if (isChat.length > 0) {
  //     res.send(isChat[0]);
  //   } else {
  //     const newChat = new Chat({
  //       chatName: "SingleChat",
  //       isGroupChat: false,
  //       users: [userId, req.user.id],
  //       groupAdmin: req.user.id,
  //     });
  //     const savedChat = await newChat.save();
  //     return res.status(200).json({ data: savedChat });
  //   }
  // } catch (error) {
  //   return res.status(500).json({ msg: "Internal Server Error" });
  // }
};

const fetchChats = async (req, res) => {
  try {
    const userRole = await User.findById(req.user.id);

    Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic profileImage",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    // throw new Error(error.message);
  }
};
const fetchMessages = async (req, res) => {
  // try {
  //   const messages = await Message.find({ chat: req.params.chatId }).populate(
  //     "chat"
  //   );
  //   res.json(messages);
  // } catch (error) {
  //   res.status(400);
  //   throw new Error(error.message);
  // }
};
const followUser = async (req, res) => {
  logger.log("like my start Chat function start");
  try {
    const userId = req?.params?.id;
    const selfId = req?.user?.id;

    // Check if the user is already following the target user
    const selfDocs = await User.findById(selfId);
    if (selfDocs.following.includes(userId)) {
      return res
        .status(400)
        .json({ data: "You are already following this user." });
    }

    // Check if the target user is already being followed by the current user
    const userDocs = await User.findById(userId);
    if (userDocs.follower.includes(selfId)) {
      return res
        .status(400)
        .json({ data: "You are already followed by this user." });
    }

    // Update following array for the current user (selfDocs)
    selfDocs.following.push(userId);
    await selfDocs.save();

    // Update follower array for the target user (userDocs)
    userDocs.follower.push(selfId);
    await userDocs.save();

    return res
      .status(200)
      .json({ data: `${userDocs?.name} Following Started` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const follwerSuggestion = async (req, res) => {
  try {
    const creatorsWithTenOrMoreBlogs = await Blog.aggregate([
      {
        $group: {
          _id: "$createdBy",
          blogCount: { $sum: 1 },
        },
      },
      {
        $match: {
          blogCount: { $gte: 0 },
        },
      },
    ]);

    let creatorIds = creatorsWithTenOrMoreBlogs.map((item) => item._id);
    let user = await User.findById(req?.user?.id);
    let alreadyFollower = user.following;
    alreadyFollower.push(req?.user?.id);
    let filterArray = creatorIds.filter(
      (element) => !alreadyFollower.includes(element)
    );
    console.log(filterArray);
    const creatorsInfo = await User.find(
      { _id: { $in: filterArray } },
      { name: 1, profileImage: 1 }
    );

    console.log(creatorsInfo);
    console.log(
      "🚀 ~ file: userController.js:290 ~ follwerSuggestion ~ userSuggestion:",
      creatorsInfo
    );
    return res.status(200).json({ data: creatorsInfo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  startChat,
  myBlog,
  likeMyBlog,
  BookMarkMyBlog,
  followUser,
  getProfileById,
  fetchChats,
  fetchMessages,
  myBlogById,
  follwerSuggestion,
};

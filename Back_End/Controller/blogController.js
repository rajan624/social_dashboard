const DEBUG = process.env.DEBUG;
const Blog = require("../models/Blog.model");
const createBlog = async (req, res) => {
  try {
    // Create a new blog object using the form da
    const newBlog = new Blog({
      htmlData: req.body.html1,
      createdBy: req.user.id,
    });
    console.log(
      "🚀 ~ file: blogController.js:23 ~ createBlog ~ req:",
      req.user.id
    );
    // Save the new blog object to MongoDB using Mongoose
    const savedBlog = await newBlog.save();
    res.status(200).json(savedBlog);
  } catch (error) {
    if (DEBUG) {
      console.log("Error", error);
    }
    res.status(500).json({ error: error.message });
  }
};
const uploadBlogImage = async (req, res) => {
  try {
    const protocol = req.protocol; // 'http' or 'https'
    const domain = req.get("host"); // Get the domain from the request headers
    const fullURL = `${protocol}://${domain}`;
    const imageUrl = fullURL + "/" + req?.file?.path;
    if (DEBUG) {
      console.log("Image Data ", imageUrl);
    }

    const data = {
      imageUrl: imageUrl,
    };
    res.status(200).json(data);
  } catch (error) {
    if (DEBUG) {
      console.log("Error", error);
    }
    res.status(500).json({ error: error.message });
  }
};
const newPost = (socket) => {
     socket.emit("newPost", data);
};
module.exports = {
  createBlog,
  uploadBlogImage,
  newPost,
};

const Router = require("express");
const router = Router.Router();
const blogController = require("../Controller/blogController");
const upload = require("../Middleware/uploadImageMiddleware");
const publicController = require("../Controller/publicController");

router.post("/createBlog", blogController.createBlog);
router.get("/all", publicController.bestStories);

module.exports = router;

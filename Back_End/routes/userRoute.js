const Router = require("express");
const router = Router.Router();
const userController = require("../Controller/userController")


router.get("/profile", userController.getProfile );
router.get("/profile/:id", userController.getProfileById );
router.patch("/profile", userController.updateProfile);
router.post("/likeMyBlog/:id", userController.likeMyBlog);
module.exports = router;



const Router = require("express");
const router = Router.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken")
const authController = require("../Controller/authController");
const cors = require("cors");
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * @swagger
 * /login:
 *  get: 
 *    description: Obtém a lista de clientes
 *    responses:
 *      '200': 
 *        description: Clientes obtidos com sucesso 
 */
router.post("/login", authController.login);
router.post("/logout", authController.logOut);
router.post("/registerAuthor", authController.signUp);
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  cors(),
  passport.authenticate("google", {
    failureRedirect: process.env.FRONTEND_URL,
  }),
  function (req, res) {
    const token = jwt.sign({ id: req.user._id }, JWT_SECRET, {
      expiresIn: 36000000,
    });
    res.cookie("token", token, {
      httpOnly: false,
    });
   res.redirect(`${process.env.FRONTEND_URL}?googleToken=${token}`);
  }
);

module.exports = router;

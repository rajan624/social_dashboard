const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const JWT_SECRET = process.env.JWT_SECRET;
const DEBUG = process.env.DEBUG;

const login = async (req, res) => {
  const { email, password } = req.body;
  // Validation
  console.log("Login function",JWT_SECRET);
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all feilds" });
  }

  try {
    // Check exisitng User
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid email or password" });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: 3600000,
    });
    if (!token) return res.status(500).json({ msg: "Internal Server Error" });
    res.status(200).json({
      token
 });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const signUp = async (req, res) => {
  const { name, email, password, phone, emailNotification } = req.body;

  // Validation
  console.log(req.body);
  if (!name || !email || !password || !phone || !emailNotification) {
    return res.status(400).json({ msg: "Please enter all feilds" });
  }

  try {
    const mailCheck = await User.findOne({ email });
    if (mailCheck) return res.status(400).json({ msg: "Email already exists" });
    
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing password");

    const newUser = new User({
      name: name,
      email: email,
      password: hash,
      phone: phone,
      emailNotification: emailNotification,
      type: "Author",
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: 3600,
    });

    res.status(200).json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.firstName,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

 const logOut = ( req , res ) => {
  try {
    res.cookie("token", "f", { httpOnly: false });
    res.status(200).json({"messages":"Logout Success"})
  } catch (error) {
    
  }
}

module.exports = {
    login,
  signUp,
    logOut
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userSignUp = async (req, res) => {
  const { name, email, password, photo } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });
  }

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const hashPwd = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    photo,
    password: hashPwd,
  });

  let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
  return res.status(200).json({ token, user: newUser });
};
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password is required" });
  }
  let user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);
    return res.status(200).json({ token, user });
  } else {
    return res.status(400).json({ error: "Invaild credientials" });
  }
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ email: user.email });
};
// Count users
countUsers = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to count users" });
  }
};

module.exports = { userLogin, userSignUp, getUser, countUsers };

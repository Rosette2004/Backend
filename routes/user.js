const express = require("express");

const router = express.Router();
const {
  userLogin,
  userSignUp,
  getUser,
  countUsers,
} = require("../controller/user");

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.get("/user/:id", getUser);
router.get("/count", countUsers);

module.exports = router;

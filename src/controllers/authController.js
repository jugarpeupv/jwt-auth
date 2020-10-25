require("dotenv").config();
const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = new User({
    username: username,
    email: email,
    password: password,
  });
  user.password = await user.encryptPassword(user.password);
  await user.save();
  //   aquí creamos un token, el primer parámetro es un payload que es un objeto, él va a cifrar ese dato. En este caso será el ID y nada más. El segundo parámetro es un secret es tan solo un texto y debería ser único en nuestra aplicación

  const token = jwt.sign({ id: user._id }, process.env.SECRETTOKEN, {
    expiresIn: 60 * 60 * 24,
  });

  res.json({ auth: true, token: token });
});

router.get("/me", verifyToken, async (req, res, next) => {
  //   para no devolver la contraseña
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) {
    return res.status(404).send("No user found");
  }

  res.json(user);
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send("The email doesnt exists");
  }
  const validPassword = await user.validatePassword(password);

  if (!validPassword) {
    return res.status(401).json({ auth: false, token: null });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRETTOKEN, {
    expiresIn: 60 * 60 * 24,
  });

  res.json({ auth: true, token: token });
});

module.exports = router;

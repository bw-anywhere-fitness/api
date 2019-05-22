const express = require("express");
const users = require("../users/users-model");
const generateToken = require("./tokenGen");
const router = express.Router();
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    users
      .add(req.body)
      .then(user => {
        console.log("USER: ", user, "THIS IS THE USER");
        const token = generateToken(user);
        console.log("TOKEN: ", token);
        res.status(201).json({
          id: user.id,
          instructor: user.instructor ? true : false,
          token
        });
      })
      .catch(err => {
        res.status(500).json({ message: "internal error adding user", err });
      });
  } else {
    res
      .status(400)
      .json({ message: "username, password and instructor is required" });
  }
});

router.post("/login", (req, res) => {
  const { password, username } = req.body;
  if (username && password) {
    users
      .findByUser(username)
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            id: user.id,
            instructor: user.instructor ? true : false,
            token: token
          });
        } else {
          res.status(401).json({ message: "invalid credentials" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "internal error logging in", err });
      });
  } else {
    res.status(400).json({ message: "username and password required" });
  }
});

router.get("/me", async (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "token invalid" });
      } else {
        req.decodedJwt = decodedToken;
        res.json({ me: decodedToken });
      }
    });
  } else {
    res.json({ message: "provide a token" });
  }
});

module.exports = router;

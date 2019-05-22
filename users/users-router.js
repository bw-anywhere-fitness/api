const express = require("express");
const users = require("./users-model");
const router = express.Router();

router.get("/", (req, res) => {
  users
    .getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
module.exports = router;

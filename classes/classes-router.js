const express = require("express");
const jwt = require("jsonwebtoken");
const classes = require("./classes-model");
const router = express.Router();

router.get("/", (req, res) => {
  classes
    .getClasses()
    .then(classes => {
      res.status(200).json(classes);
    })
    .catch(err => {
      res.status(500).json({ message: "error getting classes", err });
    });
});
router.get("/:id", (req, res) => {
  classes
    .getClassById(req.params.id)
    .then(classObj => {
      res.status(200).json(classObj);
    })
    .catch(err => {
      res.status(500).json({ message: "error getting class by ID", err });
    });
});
router.get("/instructor/:id", (req, res) => {
  classes
    .getClassesByInstructor(req.params.id)
    .then(classes => {
      res.status(200).json(classes);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "error getting classes by instructor", err });
    });
});
router.get("/client/:id", (req, res) => {
  classes
    .getClassesByUser(req.params.id)
    .then(classes => {
      res.status(200).json(classes);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "error getting classes by client ID", err });
    });
});
router.post("/", (req, res) => {
  classes
    .addClass(req.body)
    .then(classObj => {
      res.status(201).json(classObj);
    })
    .catch(err => {
      res.status(500).json({ message: "error adding class", err });
    });
});
module.exports = router;

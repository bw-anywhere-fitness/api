const express = require("express");
const restricted = require("../auth/restricted-middleware");
const instructor = require("../auth/instructor-only");
const classes = require("./classes-model");
const router = express.Router();

router.get("/", restricted, (req, res) => {
  classes
    .getClasses()
    .then(classes => {
      res.status(200).json(classes);
    })
    .catch(err => {
      res.status(500).json({ message: "error getting classes", err });
    });
});
router.get("/:id", restricted, (req, res) => {
  classes
    .getClassById(req.params.id)
    .then(classObj => {
      res.status(200).json(classObj);
    })
    .catch(err => {
      res.status(500).json({ message: "error getting class by ID", err });
    });
});
router.get("/instructor/:id", restricted, (req, res) => {
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
router.get("/client/:id", restricted, (req, res) => {
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
/// ADD CLASS
router.post("/", restricted, instructor, (req, res) => {
  console.log("USER_ID: ", req.decodedJwt.subject);
  classes
    .addClass({ ...req.body, instructor_id: req.decodedJwt.subject })
    .then(classObj => {
      res.status(201).json(classObj);
    })
    .catch(err => {
      res.status(500).json({ message: "error adding class", err });
    });
});
module.exports = router;

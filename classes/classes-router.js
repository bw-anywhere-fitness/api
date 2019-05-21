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
  const { name, schedule, location } = req.body;
  if (name && schedule && location) {
    classes
      .addClass({ ...req.body, instructor_id: req.decodedJwt.subject })
      .then(classObj => {
        res.status(201).json(classObj);
      })
      .catch(err => {
        res.status(500).json({ message: "error adding class", err });
      });
  } else {
    res
      .status(400)
      .json({ message: "bad request name, schedule and location required" });
  }
});
//// REMOVE CLASS
router.delete("/:id", restricted, instructor, async (req, res) => {
  try {
    const findClass = await classes
      .getClassById(req.params.id)
      .then(classObj => {
        if (classObj) {
          return classObj.instructor_id;
        }
        // else {
        //   res.send({ message: "class does not exist" });
        // }
      })
      .catch(err => {
        console.log(err);
      });

    if (findClass === req.decodedJwt.subject) {
      classes
        .removeClass(req.params.id)
        .then(count => {
          if (count) {
            res.status(200).json({ message: "class deleted" });
          } else {
            res.status(404).json({ message: "class does not exist" });
          }
        })
        .catch(err => {
          res.status(500).json({ message: "error removing class", err });
        });
    } else {
      res.status(400).json({
        message:
          "error removing class either not authorized or class does not exist"
      });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;

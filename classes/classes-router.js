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
///GET USERS BY CLASS
router.get("/:id/list", restricted, instructor, (req, res) => {
  classes
    .getUsersByClass(req.params.id)
    .then(users => {
      console.log("USERS LIST: ", users);
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "error getting users for this class", err });
    });
});
////GET Class by ID
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
//////ADD USER to Class by Class ID -> Takes class ID from Reqs and User ID from Token
router.post("/add/:id", restricted, (req, res) => {
  const class_id = req.params.id;
  const user_id = req.decodedJwt.subject;
  classes
    .addUserToClass(class_id, user_id)
    .then(classes => {
      console.log("CLASSES: ", classes);
      res.status(201).json(classes);
    })
    .catch(err => {
      res.status(500).json({ message: "error adding client to class", err });
    });
});
//////REMOVE USER from class by Class ID
router.delete("/remove/:id", restricted, (req, res) => {
  classes
    .removdeUserFromClass(req.params.id, req.decodedJwt.subject)
    .then(classes => {
      res.status(200).json(classes);
    })
    .catch(err => {
      res.status(500).json({ message: "error removing user from class" });
    });
});
/////PUT Update Client Uses Remaining by Class ID
router.put("/:id/list/update", restricted, (req, res) => {
  const { user_id, uses_remaining } = req.body;
  if (user_id && uses_remaining) {
    classes
      .updateClassUses(req.params.id, user_id, req.body)
      .then(classes => {
        res.status(200).json(classes);
      })
      .catch(err => {
        res.status(500).json({ message: "error updating uses" });
      });
  } else {
    res
      .status(400)
      .json({ message: "bad request, user_id and uses_remaining is required" });
  }
});
/////GET Classes by instructor ID -> Returns All Class for Instructor
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
/////// DELETE Class by Instructor
router.delete("/instructor/:id/remove", restricted, (req, res) => {
  if (Number(req.params.id) === Number(req.decodedJwt.subject)) {
    classes
      .removeClassesByInstructor(req.params.id, req.body.id)
      .then(classes => {
        if (!classes) {
          res.status(404).json({ message: "class does not exist" });
        } else {
          res.status(200).json(classes);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "error getting classes by instructor", err });
      });
  } else {
    res.status(403).json({ message: "not authorized to delete this class" });
  }
});
////GET ALL Classes For Client by Client ID
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
        .then(classes => {
          if (classes) {
            res.status(200).json(classes);
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

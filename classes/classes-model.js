const db = require("../data/dbConfig");

module.exports = {
  getClasses,
  getClassById,
  getClassesByInstructor,
  getClassesByUser,
  addClass
};

function getClasses() {
  return db("classes");
}
function getClassById(id) {
  return db("classes")
    .where({ id: id })
    .first();
}
function getClassesByInstructor(id) {
  return db

    .from("classes")

    .join("users", "users.id", "=", "classes.instructor_id")
    .select(
      "classes.name",
      "users.username",
      "classes.schedule",
      "classes.location",
      "classes.image"
    )

    .where({ instructor_id: id });
}
function getClassesByUser(id) {
  return db("users_classes")
    .where({ user_id: id })
    .innerJoin("classes", "classes.id", "users_classes.class_id")
    .select(
      "classes.name",
      "classes.schedule",
      "classes.location",
      "classes.image"
    );
}
function addClass(classObj) {
  console.log(classObj);
  return db("classes")
    .insert(classObj)
    .then(id => {
      console.log("ID: ", id);
      return db("classes")
        .where({ id: id[0] })
        .first();
    });
}

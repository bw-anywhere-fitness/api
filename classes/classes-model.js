const db = require("../data/dbConfig");

module.exports = {
  getClasses,
  getClassById,
  getClassesByInstructor,
  getClassesByUser,
  getUsersByClass,
  addClass,
  addUserToClass,
  removeClass,
  removdeUserFromClass,
  removeClassesByInstructor,
  updateClassUses
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
      "classes.image",
      "classes.id"
    )

    .where({ instructor_id: id });
}
function removeClassesByInstructor(id, classId) {
  return db
    .from("classes")
    .join("users", "users.id", "=", "classes.instructor_id")
    .where({ instructor_id: id, id: classId })
    .first()
    .del()
    .then(count => {
      return getClassesByInstructor(id);
    });
}
function getClassesByUser(id) {
  return db("users_classes")
    .where({ user_id: id })
    .innerJoin("classes", "classes.id", "users_classes.class_id")
    .select(
      "classes.name",
      "classes.schedule",
      "classes.location",
      "users_classes.uses_remaining",
      "classes.image",
      "classes.id"
    );
}
function getUsersByClass(id) {
  return db("users_classes")
    .where({ class_id: id })
    .innerJoin("users", "users.id", "users_classes.user_id")
    .select(
      "users.id",
      "users.username",
      "users_classes.uses_remaining",
      "users_classes.user_id"
    );
}
function addClass(classObj) {
  return db("classes")
    .insert(classObj)
    .then(id => {
      return db("classes")
        .where({ id: id[0] })
        .first();
    });
}
function removeClass(id) {
  return db("classes")
    .where({ id: id })
    .first()
    .del()
    .then(count => {
      return getClasses().then(classes => {
        return classes;
      });
    });
}
function addUserToClass(classId, user_id) {
  return db("users_classes")
    .insert({ class_id: classId, user_id: user_id })
    .then(count => {
      return getClassesByUser(user_id).then(classes => {
        return classes;
      });
    });
}
function removdeUserFromClass(classId, user_id) {
  return db("users_classes")
    .where({ class_id: classId, user_id: user_id })
    .first()
    .del()
    .then(count => {
      return getClassesByUser(user_id);
    });
}
function updateClassUses(classId, user_id, updatedInfo) {
  return db("users_classes")
    .where({ class_id: classId, user_id: user_id })
    .first()
    .update(updatedInfo)
    .then(count => {
      return getUsersByClass(classId);
    });
}

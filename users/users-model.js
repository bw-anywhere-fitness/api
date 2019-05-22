const db = require("../data/dbConfig");

module.exports = {
  getUsers,
  add,
  findByUser
};
function getUsers() {
  return db("users");
}
function add(user) {
  return db("users")
    .insert(user)
    .then(id => {
      return db("users")
        .where({ id: id[0] })
        .first();
    });
}
function findByUser(username) {
  return db("users")
    .where({ username: username })
    .first();
}

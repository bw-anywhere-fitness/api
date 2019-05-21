exports.up = function(knex, Promise) {
  return knex.schema.createTable("users_classes", tbl => {
    tbl.increments();
    tbl
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");
    tbl
      .integer("class_id")
      .unsigned()
      .references("id")
      .inTable("classes")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users_classes");
};

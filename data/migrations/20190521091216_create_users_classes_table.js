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
    tbl
      .integer("uses_remaining")
      .defaultTo(10)
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users_classes");
};

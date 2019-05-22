exports.up = function(knex, Promise) {
  return knex.schema.createTable("classes", tbl => {
    tbl.increments();
    tbl.string("name").notNullable();
    tbl.string("schedule").notNullable();
    tbl.string("location").notNullable();
    tbl.string("image");
    tbl
      .integer("instructor_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT")
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("classes");
};

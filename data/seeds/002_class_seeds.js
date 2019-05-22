exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("classes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("classes").insert([
        {
          name: "CrossFit",
          schedule: "Thursday & Saturday 11:00 AM",
          location: "123 Main Street",
          instructor_id: 1
        },
        {
          name: "Tai-Chi",
          schedule: "Saturday 11:00 AM",
          location: "456 Parker Ave",
          instructor_id: 3
        },
        {
          name: "Yoga",
          schedule: "Sunday 9:00 AM",
          location: "1600 Fox Drive",
          instructor_id: 1
        },
        {
          name: "Pilates",
          schedule: "MWF 11:00 AM",
          location: "123 Main Street",
          instructor_id: 3
        }
      ]);
    });
};

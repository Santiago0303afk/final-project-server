/*==================================================
/database/utils/seedDB.js

It seeds the database with several initial students and campuses.
==================================================*/
const { Campus, Student } = require('../models');  // Import database models

// Seed database
const seedDB = async () => {
  // Create campuses
  const dummy_campus = await Campus.create({
    name: "Hunter College",
    address: "695 Park Ave, New York, NY 10065",
    description: "This is a school in New York, New York.",
    imageUrl: "https://via.placeholder.com/300"
  });

  const dummy_campus2 = await Campus.create({
    name: "Queens College",
    address: "65-30 Kissena Blvd, Queens, NY 11367",
    description: "This is a school in Queens, New York.",
    imageUrl: "https://via.placeholder.com/300"
  });

  const dummy_campus3 = await Campus.create({
    name: "Brooklyn College",
    address: "2900 Bedford Ave, Brooklyn, NY 11210",
    description: "This is a school in Brooklyn, New York.",
    imageUrl: "https://via.placeholder.com/300"
  });

  // Create students
  const dummy_student = await Student.create({
    firstname: "Joe",
    lastname: "Smith",
    email: "joe.smith@example.com",
    gpa: 3.2,
    imageUrl: "https://via.placeholder.com/150"
  });

  const dummy_student2 = await Student.create({
    firstname: "Mary",
    lastname: "Johnson",
    email: "mary.johnson@example.com",
    gpa: 3.8,
    imageUrl: "https://via.placeholder.com/150"
  });

  // Associate students with campuses
  await dummy_student.setCampus(dummy_campus);
  await dummy_student2.setCampus(dummy_campus2);
};

// Export the database seeding function
module.exports = seedDB;

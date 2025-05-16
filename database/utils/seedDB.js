/*==================================================
/database/utils/seedDB.js

It seeds the database with several initial students and campuses.
==================================================*/
const { Campus, Student } = require('../models');  // Import database models

// Seed database
const seedDB = async () => {
	// Create dummy campuses
	const hunter = await Campus.create({
		name: "Hunter College",
		address: "695 Park Ave, New York, NY 10065",
		description: "This is a school in New York, New York."
	});
	const queens = await Campus.create({
		name: "Queens College",
		address: "65-30 Kissena Blvd, Queens, NY 11367",
		description: "This is a school in Queens, New York."
	});
	const brooklyn = await Campus.create({
		name: "Brooklyn College",
		address: "2900 Bedford Ave, Brooklyn, NY 11210",
		description: "This is a school in Brooklyn, New York."
	});

	// Create dummy students with required fields
	const joe = await Student.create({
		firstname: "Joe",
		lastname: "Smith",
		email: "joe.smith@example.com",
		gpa: 3.5
	});
	const mary = await Student.create({
		firstname: "Mary",
		lastname: "Johnson",
		email: "mary.johnson@example.com",
		gpa: 3.8
	});

	// Associate students to campuses
	await joe.setCampus(hunter);
	await mary.setCampus(queens);
};

module.exports = seedDB;

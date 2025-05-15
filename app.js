/*==================================================
/app.js

This is the top-level (main) file for the server application.
It is the first file to be called when starting the server application.
It initiates all required parts of server application such as Express, routes, database, etc.  
==================================================*/

/* SET UP DATABASE */
// Import database setup utilities
const createDB = require('./database/utils/createDB');  // Import function to create database
const seedDB = require('./database/utils/seedDB');      // Import function to seed database
const db = require('./database');                       // Import database instance

/* EXPRESS & ROUTING SETUP */
const express = require("express");
const app = express();
const apiRouter = require('./routes/index');
const open = require('open');  // For automatically opening the browser

/* MODEL SYNCHRONIZATION & DATABASE SEEDING */
const syncDatabase = async () => {
  try {
    await db.sync({ force: true });  // Drop tables if they already exist
    console.log('------Synced to db--------');
    await seedDB();  
    console.log('--------Successfully seeded db--------');
  } catch (err) {
    console.error('syncDB error:', err);
  }  
};

/* CONFIGURE EXPRESS APPLICATION */
const configureApp = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api", apiRouter);

  // 404 Not Found handler
  app.use((req, res, next) => {
    const error = new Error("Not Found, Please Check URL!");
    error.status = 404;
    next(error);
  });

  // Error-handling middleware
  app.use((err, req, res, next) => {
    console.error(err);
    console.log(req.originalUrl);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

/* SERVER BOOTSTRAP */
const PORT = 5001;

const bootApp = async () => {
  await createDB();         // Create database if not exists
  await syncDatabase();     // Seed the database
  await configureApp();     // Set up routes and middleware
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
    open(`http://localhost:${PORT}`);  // Open browser
  });
};

bootApp();

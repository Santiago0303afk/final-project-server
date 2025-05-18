/*==================================================
/app.js
==================================================*/

// Import modules
const express = require("express");
const cors = require("cors");

// Import database setup
const createDB = require('./database/utils/createDB');
const seedDB = require('./database/utils/seedDB');
const db = require('./database');

// Create Express app
const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import routes
const apiRouter = require('./routes/index');
app.use("/api", apiRouter);

// Handle 404
app.use((req, res, next) => {
  const error = new Error("Not Found, Please Check URL!");
  error.status = 404;
  next(error);
});

// Error middleware
app.use((err, req, res, next) => {
  console.error(err);
  console.log(req.originalUrl);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// Sync DB and start server
const syncDatabase = async () => {
  try {
    await db.sync({ force: true });
    console.log('------Synced to db--------');
    await seedDB();
    console.log('--------Successfully seeded db--------');
  } catch (err) {
    console.error('syncDB error:', err);
  }
};

const bootApp = async () => {
  await createDB();
  await syncDatabase();

  const PORT = 5001;
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
};

bootApp();

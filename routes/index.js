/*==================================================
/routes/index.js

It defines all the routes used by Express application.
==================================================*/
const db = require('./db');  // Database instance

require('../database/models');  // Export models

module.exports = db;  // Export database instance

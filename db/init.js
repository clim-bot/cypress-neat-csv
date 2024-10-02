const { Sequelize } = require('sequelize');

// Create a new Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',  // Path to the SQLite database file
  logging: false  // Disable logging
});

const initDB = async () => {
  try {
    // Authenticate the connection
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sync the models (creates the tables based on the models)
    await sequelize.sync({ force: true });
    console.log('Database tables synced successfully.');

    // Backup logic or other operations if needed
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

// Export the Sequelize instance
module.exports = { sequelize, initDB };

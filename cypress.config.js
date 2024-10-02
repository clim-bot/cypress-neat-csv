const { defineConfig } = require("cypress");
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        writeCsvFile({ filePath, data }) {
          fs.writeFileSync(filePath, data, 'utf8');
          return null;
        }
      });

      // Return the modified config
      return config;
    },
    fixturesFolder: 'cypress/fixtures',
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/**/**/*.cy.{js,jsx,ts,tsx}',
    video: false,
    chromeWebSecurity: false,
  },
});

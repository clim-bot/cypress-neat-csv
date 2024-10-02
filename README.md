
# Cypress Neat CSV

This project demonstrates how to use Cypress to test the download and verification of CSV files using the `neat-csv` package.

## Project Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v12 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:clim-bot/cypress-neat-csv.git
   ```

2. Navigate to the project directory:
   ```bash
   cd cypress-neat-csv
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Tests

1. Start the server:
   ```bash
   npm run start
   ```

2. Run the Cypress tests:
   ```bash
   npx cypress open
   ```

3. To run the tests in headless mode:
   ```bash
   npx cypress run
   ```

### Cypress Configuration

In **`cypress.config.js`**, a task is defined to handle file system operations, such as saving CSV files.

```javascript
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        writeCsvFile({ filePath, data }) {
          const fs = require('fs');
          fs.writeFileSync(filePath, data, 'utf8');
          return null;
        }
      });

      return config;
    },
    fixturesFolder: 'cypress/fixtures',
  },
});
```

### Test Details

The test downloads a CSV file from the API and saves it in the `cypress/fixtures` folder. It then compares the downloaded CSV file with the parsed API response to ensure they match.

#### Example Test:

```javascript
describe('CSV download and comparison test', () => {
  it('should download and save the CSV file to the fixtures folder and compare it with the API data', () => {
    const fixturePath = path.join(Cypress.config('fixturesFolder'), 'communities.csv');

    cy.request('/api/communities/download').then((response) => {
      expect(response.status).to.eq(200);
      cy.task('writeCsvFile', { filePath: fixturePath, data: response.body });
      return neatCSV(response.body);
    }).then((apiData) => {
      cy.fixture('communities.csv').then((csvContent) => neatCSV(csvContent)).then((downloadedData) => {
        expect(downloadedData).to.deep.equal(apiData);
      });
    });
  });
});
```


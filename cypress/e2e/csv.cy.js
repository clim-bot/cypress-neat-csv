const neatCSV = require("neat-csv");
const path = require("path");

describe("CSV download and comparison test", () => {
  it("should download and save the CSV file to the fixtures folder and compare it with the API data", () => {
    // Define the file path where the CSV will be saved in the fixtures folder
    const fixturePath = path.join(
      Cypress.config("fixturesFolder"),
      "communities.csv"
    );

    // Make a GET request to fetch the CSV file from the API
    cy.request({
      method: "GET",
      url: "/api/communities/download",
      encoding: "utf8", // Ensure the CSV content is interpreted as UTF-8 text
    })
      .then((response) => {
        // Assert the status code is 200 (OK)
        expect(response.status).to.eq(200);

        // Assert the content-type header is 'text/csv'
        expect(response.headers["content-type"]).to.include("text/csv");

        // Use the Cypress task to write the CSV to the fixtures folder
        cy.task("writeCsvFile", { filePath: fixturePath, data: response.body });

        // Parse the API CSV data from the response body using neat-csv
        return neatCSV(response.body);
      })
      .then((apiData) => {
        // Read the downloaded CSV file from the fixtures folder
        cy.fixture("communities.csv")
          .then((csvContent) => {
            // Parse the downloaded CSV data using neat-csv
            return neatCSV(csvContent);
          })
          .then((downloadedData) => {
            // Compare the parsed API data with the downloaded CSV data
            expect(downloadedData).to.deep.equal(apiData);
          });
      });
  });
});

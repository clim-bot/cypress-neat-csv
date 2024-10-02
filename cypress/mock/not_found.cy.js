describe.skip("404 Not Found error test using cy.intercept()", () => {
  it("should handle a 404 error from the API", () => {
    // Intercept the request and mock a 404 Not Found error
    cy.intercept("GET", "/api/communities/download", {
      statusCode: 404,
      body: "Not Found",
    }).as("getNotFoundError");

    // Request the CSV file
    cy.request({
      method: "GET",
      url: "/api/communities/download",
      failOnStatusCode: false, // Allow the test to continue even with a failed status code
    }).then((response) => {
      // Assert the status code is 404
      expect(response.status).to.eq(404);

      // Assert the body contains the "Not Found" message
      expect(response.body).to.eq("Not Found");
    });
  });
});

describe.skip("500 Internal Server Error test using cy.intercept()", () => {
  it("should handle a 500 error from the API", () => {
    // Intercept the request and mock a 500 Internal Server Error
    cy.intercept("GET", "/api/communities/download", {
      statusCode: 500,
      body: "Internal Server Error",
    }).as("getServerError");

    // Request the CSV file
    cy.request({
      method: "GET",
      url: "/api/communities/download",
      failOnStatusCode: false, // Allow the test to continue even with a failed status code
    }).then((response) => {
      // Assert the status code is 500
      expect(response.status).to.eq(500);

      // Assert the body contains the error message
      expect(response.body).to.eq("Internal Server Error");
    });
  });
});

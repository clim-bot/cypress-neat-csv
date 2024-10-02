describe.skip("Invalid CSV data test using cy.intercept()", () => {
  it("should handle a CSV response with invalid data", () => {
    // Mock invalid CSV data (e.g., missing "created_at" field)
    const mockInvalidCsv = `
        id,name,description
        1,Invalid Community A,Invalid Description A
      `;

    // Intercept the request and mock the response with invalid CSV data
    cy.intercept("GET", "/api/communities/download", {
      statusCode: 200,
      headers: {
        "content-type": "text/csv",
      },
      body: mockInvalidCsv,
    }).as("getInvalidCsv");

    // Request the CSV file
    cy.request("/api/communities/download").then((response) => {
      // Assert the response status code is 200
      expect(response.status).to.eq(200);

      // Assert that the content-type is CSV
      expect(response.headers["content-type"]).to.include("text/csv");

      // Assert the body contains the invalid CSV data
      expect(response.body).to.eq(mockInvalidCsv.trim());
    });
  });
});

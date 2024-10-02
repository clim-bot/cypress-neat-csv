describe.skip("Partial CSV response test using cy.intercept()", () => {
  it("should handle a partially populated CSV response", () => {
    // Mock partially populated CSV data
    const mockPartialCsv = `
        id,name,description,created_at
        1,Partial Community A,Description A,2024-10-02T20:42:30.563Z
      `;

    // Intercept the request and mock the response with partial CSV data
    cy.intercept("GET", "/api/communities/download", {
      statusCode: 200,
      headers: {
        "content-type": "text/csv",
      },
      body: mockPartialCsv,
    }).as("getPartialCsv");

    // Request the CSV file
    cy.request("/api/communities/download").then((response) => {
      // Assert the response status code is 200
      expect(response.status).to.eq(200);

      // Assert that the content-type is CSV
      expect(response.headers["content-type"]).to.include("text/csv");

      // Assert the body contains the partial data
      expect(response.body).to.eq(mockPartialCsv.trim());
    });
  });
});

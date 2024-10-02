describe.skip("Mock POST request using cy.intercept()", () => {
  it("should successfully mock a POST request to create a new community", () => {
    // Define the mock request body that would be sent by the client
    const newCommunity = {
      name: "Mock Community",
      description: "This is a mock community",
    };

    // Define the mock response body from the server
    const mockResponse = {
      id: 123,
      name: "Mock Community",
      description: "This is a mock community",
      created_at: "2024-10-02T21:42:30.563Z",
    };

    // Intercept the POST request and mock the server response
    cy.intercept("POST", "/api/communities", {
      statusCode: 201, // 201 Created status
      body: mockResponse, // Mocked response body
    }).as("postCommunity");

    // Simulate a form submission or API call
    cy.request("POST", "/api/communities", newCommunity).then((response) => {
      // Assert the status code is 201
      expect(response.status).to.eq(201);

      // Assert that the response body matches the mock response
      expect(response.body).to.deep.equal(mockResponse);
    });
  });
});

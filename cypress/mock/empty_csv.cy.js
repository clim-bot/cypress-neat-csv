describe.skip('Empty CSV response test using cy.intercept()', () => {
  it('should handle an empty CSV file response', () => {
    // Mock an empty CSV file response with only headers
    const mockEmptyCsv = 'id,name,description,created_at\n';

    // Intercept the request and mock the response with an empty CSV
    cy.intercept({
      method: 'GET',
      url: '/api/communities/download',
    }, {
      statusCode: 200,
      headers: {
        'content-type': 'text/csv',
      },
      body: mockEmptyCsv,
    }).as('getEmptyCsv');

    // Ensure the intercept is set before making the request
    cy.log('Intercept set for /api/communities/download');

    // Make the request and alias it for later assertions
    cy.request('/api/communities/download').as('request');

    // Wait for the intercepted request
    cy.wait('@getEmptyCsv', { timeout: 10000 }).then((interception) => {
      // Log the intercepted response for debugging purposes
      cy.log('Intercepted Response:', interception.response.body);

      // Assert the intercepted response body is as expected
      expect(interception.response.body.trim()).to.eq(mockEmptyCsv.trim());

      // Assert the request response
      cy.get('@request').then((response) => {
        // Assert the status code is 200
        expect(response.status).to.eq(200);
        // Assert that the content-type is CSV
        expect(response.headers['content-type']).to.include('text/csv');
        // Assert that the response contains only the headers with no data
        expect(response.body.trim()).to.eq(mockEmptyCsv.trim());
      });
    });
  });
});

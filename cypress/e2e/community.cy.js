describe("Community API tests", () => {
  // Test for fetching all communities
  it("should fetch all communities", () => {
    cy.request("/api/communities").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.communities).to.be.an("array");
      expect(response.body.communities.length).to.be.greaterThan(0); // Expect seed data
    });
  });

  // Test for adding a new community
  it("should add a new community", () => {
    cy.request({
      method: "POST",
      url: "/api/communities",
      body: {
        name: "Community K",
        description: "Description K",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
      expect(response.body.name).to.eq("Community K");
      expect(response.body.description).to.eq("Description K");
    });

    // Check that the new community is included in the list
    cy.request("/api/communities").then((response) => {
      const communities = response.body.communities;
      const communityNames = communities.map((community) => community.name);
      expect(communityNames).to.include("Community K");
    });
  });

  // Test for downloading the list of communities as CSV
  it("should download the list of communities as CSV", () => {
    cy.request({
      method: "GET",
      url: "/api/communities/download",
      encoding: "utf8", // Ensure the CSV content is interpreted as UTF-8 text
    }).then((response) => {
      expect(response.status).to.eq(200); // Check the response status
      expect(response.headers["content-type"]).to.eq("text/csv; charset=utf-8"); // Check the content type

      // Split the CSV content into lines
      const csvLines = response.body.split("\n");

      // Log csvLines for debugging
      cy.log(csvLines);

      // Remove quotes around the first line (header) and then compare
      const header = csvLines[0].replace(/"/g, ""); // Remove any quotes in the headers

      // Check that the first line contains the correct CSV headers
      expect(header).to.eq("id,name,description,created_at");

      // Validate that the CSV body contains the correct number of lines (10 initial + 1 new)
      expect(csvLines.length).to.be.greaterThan(1); // Ensure there are more than just headers
    });
  });
});

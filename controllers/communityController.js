const { Community } = require('../models/community');
const { Parser } = require('json2csv');

const getAllCommunities = async (req, res) => {
  try {
    // Log the start of the fetch process
    console.log('Fetching communities...');
    const communities = await Community.findAll();
    
    res.json({ communities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch communities.' });
  }
};

const addCommunity = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCommunity = await Community.create({ name, description });
    res.json(newCommunity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add community.' });
  }
};

const downloadCommunitiesCSV = async (req, res) => {
  try {
    const communities = await Community.findAll();
    
    // Define the CSV headers
    const fields = ['id', 'name', 'description', 'created_at'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(communities.map(c => c.toJSON()));

    // Set the response headers and send the CSV file
    res.header('Content-Type', 'text/csv');
    res.attachment('communities.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Failed to download CSV' });
  }
};

module.exports = {
  getAllCommunities,
  addCommunity,
  downloadCommunitiesCSV
};

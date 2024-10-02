const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

// Define the routes
router.get('/communities', communityController.getAllCommunities);
router.post('/communities', communityController.addCommunity);
router.get('/communities/download', communityController.downloadCommunitiesCSV);

module.exports = router;

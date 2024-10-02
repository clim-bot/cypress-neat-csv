const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const healthRoutes = require('./health');

// Define the routes
router.get('/communities', communityController.getAllCommunities);
router.post('/communities', communityController.addCommunity);
router.get('/communities/download', communityController.downloadCommunitiesCSV);
router.use(healthRoutes);

module.exports = router;

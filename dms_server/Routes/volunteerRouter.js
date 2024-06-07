const express = require('express');
const router = express.Router();
const volunteerController = require('../Controllers/volunteerController');

// Define your routes here
router.post('/sendresourceRequest', volunteerController.sendresourceRequest);
router.get('/getresourceRequest', volunteerController.getResourceRequest);

module.exports = router;

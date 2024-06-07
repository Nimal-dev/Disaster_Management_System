const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Define your routes here
router.post('/helpRequest', userController.sendHelp);
router.get('/helpRequests', userController.getHelpRequests);

module.exports = router;

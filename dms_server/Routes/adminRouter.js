const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

// Define your routes here
router.post('/AddState', adminController.addState);
router.get('/viewstate', adminController.viewstate);
router.post('/updateStateById', adminController.UpdateState);
router.post('/editAndUpdateState', adminController.editAndUpdateState);
router.post('/deleteState', adminController.deleteState);



router.post('/updateVolunteerById', adminController.UpdateVolunteer);;
router.post('/editAndUpdateVolunteer', adminController.editAndUpdateVolunteer);
router.get('/viewvolunteer', adminController.viewvolunteer);
router.post('/AddVolunteer', adminController.AddVolunteer);
router.post('/deleteVolunteer', adminController.deleteVolunteer);

module.exports = router;

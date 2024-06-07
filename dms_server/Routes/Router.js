const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const sosController = require('../Controllers/sosController');
const notificationController = require('../Controllers/notificationController');

//--------------------SIGNUP ROUTE---------------------- //
router.post('/signup', authController.signup);
router.post('/volunteerSignup', authController.volunteerSignup);

//--------------------SIGNIN ROUTE---------------------- //
router.post('/signin', authController.signin);

//--------------------SOS requests---------------------- //
router.post('/sos', sosController.createSos);

//--------------------Fetch notifications---------------------- //
router.get('/notifications', notificationController.getNotifications);
router.post('/notifications/mark-read', notificationController.markNotificationsRead);

module.exports = router;

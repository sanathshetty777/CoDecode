const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Fetch profile
router.get("/", profileController.getProfile);

// Create profile
router.post('/create', profileController.createProfile);

// Fetch profile
router.get('/:userId', profileController.getProfile);

// Update profile
router.put('/update/:userId', profileController.updateProfile);

// Delete profile
router.delete('/delete', profileController.deleteProfile);

module.exports = router;
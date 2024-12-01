const express = require('express');
const userController = require('../controllers/userProfileController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to validate JWT
const router = express.Router();

router.get('/user', authMiddleware, userController.getUser);

module.exports = router;

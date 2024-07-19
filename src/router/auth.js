const express = require('express');

const AuthHandler = require('../handler/auth');
const AuthService = require('../service/auth');
const UserRepository = require('../repository/user');

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authHandler = new AuthHandler(authService);

const router = express.Router();

router.post('/login', authHandler.login);
router.post('/register', authHandler.register);

module.exports = router;
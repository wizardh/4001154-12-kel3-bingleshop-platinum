const express = require('express');

const AuthHandler = require('../handler/auth');
const AuthService = require('../service/auth');
const UserRepository = require('../repository/user');
const MailRepository = require('../repository/mail');

const userRepository = new UserRepository();
const mailRepository = new MailRepository();
const authService = new AuthService(userRepository, mailRepository);
const authHandler = new AuthHandler(authService);

const router = express.Router();

router.post('/login', authHandler.login);
router.post('/register', authHandler.register);
router.post('/verify', authHandler.verify);

module.exports = router;
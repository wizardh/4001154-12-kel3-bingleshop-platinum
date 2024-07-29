const express = require('express');

const UserHandler = require("../handler/user");
const UserService = require("../service/user");
const UserRepository = require("../repository/user");

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userHandler = new UserHandler(userService);

// import middleware
const authMiddleware = require('../middleware/auth')

const router = express.Router();

router.get("/", authMiddleware.authenticate, authMiddleware.checkUser, userHandler.getAll);
router.get("/email/:email", userHandler.getByEmail);
router.get("/id/:id", userHandler.getById);
router.patch("/id/:id", userHandler.update);
router.delete("/id/:id", userHandler.delete);

module.exports = router;
const express = require('express');

const UserHandler = require("../handler/user");
const UserService = require("../service/user");
const UserRepository = require("../repository/user");

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userHandler = new UserHandler(userService);

const router = express.Router();

router.get("/users", userHandler.getAll);
router.get("/users/email/:email", userHandler.getByEmail);
router.get("/users/id/:id", userHandler.getById);
router.patch("/users/id/:id", userHandler.update);
router.delete("/users/id/:id", userHandler.delete);

module.exports = router;
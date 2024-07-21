const express = require('express');

const UserRepository = require("../repository/user");
const UserService = require("../service/user");
const UserHandler = require("../handler/user");

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userHandler = new UserHandler(userService);

router.get("/", userHandler.getAll);
router.get("/email/:email", userHandler.getByEmail);
router.get("/id/:id", userHandler.getById);
router.patch("/id/:id", userHandler.update);
router.delete("/id/:id", userHandler.delete);

module.exports = router;
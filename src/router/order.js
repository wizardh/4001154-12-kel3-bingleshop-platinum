const express = require('express');

const UserRepository = require("../repository/user");
const ItemRepository = require("../repository/item");
const OrderRepository = require("../repository/order");
const OrderService = require("../service/order");
const OrderHandler = require("../handler/order");

const router = express.Router();

const userRepository = new UserRepository();
const itemRepository = new ItemRepository();
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository, itemRepository, userRepository);
const orderHandler = new OrderHandler(orderService);

// import middleware
const authMiddleware = require('../middleware/auth')

router.get("/", authMiddleware.authenticate, authMiddleware.checkRoleUser, orderHandler.getAll);
router.get("/:id", authMiddleware.authenticate, authMiddleware.checkRoleUser, orderHandler.getById);
router.post("/", authMiddleware.authenticate, authMiddleware.checkRoleUser, orderHandler.create);
router.patch("/:id", authMiddleware.authenticate, authMiddleware.checkRoleUser, orderHandler.update);
router.delete("/:id", authMiddleware.authenticate, authMiddleware.checkRoleUser, orderHandler.delete);

module.exports = router;
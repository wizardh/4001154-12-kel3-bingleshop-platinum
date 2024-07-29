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

router.get("/", orderHandler.getAll);
router.get("/:id", orderHandler.getById);
router.post("/", orderHandler.create);
router.patch("/:id", orderHandler.update);
router.delete("/:id", orderHandler.delete);

module.exports = router;
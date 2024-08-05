const express = require('express');

const ItemRepository = require("../repository/item");
const ItemService = require("../service/item");
const ItemHandler = require("../handler/item");

const router = express.Router();

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const itemHandler = new ItemHandler(itemService);

// import middleware
const authMiddleware = require('../middleware/auth')

router.get("/", authMiddleware.authenticate, authMiddleware.checkRoleUser, itemHandler.getAll);
router.get("/:id", authMiddleware.authenticate, authMiddleware.checkRoleUser, itemHandler.getById);
router.post("/", authMiddleware.authenticate, authMiddleware.checkRoleAdmin, itemHandler.create);
router.patch("/:id", authMiddleware.authenticate, authMiddleware.checkRoleAdmin, itemHandler.update);
router.delete("/:id", authMiddleware.authenticate, authMiddleware.checkRoleAdmin, itemHandler.delete);


module.exports = router;
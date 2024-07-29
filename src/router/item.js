const express = require('express');

const ItemRepository = require("../repository/item");
const ItemService = require("../service/item");
const ItemHandler = require("../handler/item");

const router = express.Router();

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const itemHandler = new ItemHandler(itemService);

router.get("/", itemHandler.getAll);
router.get("/:id", itemHandler.getById);
router.post("/", itemHandler.create);
router.patch("/:id", itemHandler.update);
router.delete("/:id", itemHandler.delete);


module.exports = router;
const express = require("express");
const app = express();

// Import dependecy
// Import repository
const UserRepository = require("./repository/user");
const ItemRepository = require("./repository/item");
const OrderRepository = require("./repository/order");

// Import service
const AuthService = require("./service/auth");
const UserService = require("./service/user");
const ItemService = require("./service/item");
const OrderService = require("./service/order");

// Import handler
const AuthHandler = require("./handler/auth");
const UserHandler = require("./handler/user");
const ItemHandler = require("./handler/item");
const OrderHandler = require("./handler/order");

app.use(express.json());

const userRepository = new UserRepository();

const router = express.Router();

// Import router
const authRouter = require('./router/auth');
const userRouter = require('./router/user');
const itemRouter = require('./router/item');
const orderRouter = require('./router/order');
const fileRouter = require('./router/file');

// Use router
router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/items', itemRouter)
router.use('/orders', orderRouter)
router.use('/file', fileRouter)

app.use('/api', router)

app.use((req, res, next) => {
    res.status(404).send({
        status: "fail",
        message: "not found",
    });
});

module.exports = app;
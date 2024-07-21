const express = require("express");
const app = express();
const PORT = 2000;

// Import dependecy
// Import repository
const UserRepository = require("./src/repository/user");
const ItemRepository = require("./src/repository/item");
const OrderRepository = require("./src/repository/order");

// Import service
const AuthService = require("./src/service/auth");
const UserService = require("./src/service/user");
const ItemService = require("./src/service/item");
const OrderService = require("./src/service/order");

// Import handler
const AuthHandler = require("./src/handler/auth");
const UserHandler = require("./src/handler/user");
const ItemHandler = require("./src/handler/item");
const OrderHandler = require("./src/handler/order");

app.use(express.json());

const userRepository = new UserRepository();

const router = express.Router();

// Import router
const authRouter = require('./src/router/auth');
const userRouter = require('./src/router/user');
const itemRouter = require('./src/router/item');
const orderRouter = require('./src/router/order');

// Use router
router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/items', itemRouter)
router.use('/orders', orderRouter)

app.use('/api', router)

app.use((req, res, next) => {
  res.status(404).send({
    status: "fail",
    message: "not found",
  });
});

app.listen(PORT, function () {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});

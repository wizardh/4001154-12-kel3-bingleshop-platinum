const OrderService = require("../order");

describe("OrderService", () => {
    let orderService;
    let orderRepository;
    let itemRepository;
    let userRepository;

    beforeEach(() => {
        orderRepository = {
            getAll: jest.fn(),
            getById: jest.fn(),
            add: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };
        itemRepository = {
            getById: jest.fn(),
        };
        userRepository = {
            getById: jest.fn(),
        };
        orderService = new OrderService(orderRepository, itemRepository, userRepository);
    });

    describe("getAll", () => {
        it("success: should return all orders", async() => {
            const mockOrders = [{
                id: 1,
                user_id: 1,
                item_id: 1,
                price: 100,
                qty: 2,
                total: 200,
                status: "pending",
                User: { name: "John Doe", email: "john@example.com" },
                Item: { name: "Item 1" },
            }];
            orderRepository.getAll.mockResolvedValue(mockOrders);

            const result = await orderService.getAll();

            expect(result).toEqual({
                statusCode: 200,
                data: mockOrders,
            });
        });
    });

    describe("getById", () => {
        it("success: should return an order when found", async() => {
            const mockOrder = {
                id: 8,
                user_id: 1,
                item_id: 1,
                price: 60000,
                qty: 2,
                total: 120000,
                status: "pending",
                User: { name: "ismail", email: "ismail1@gmail.com" },
                Item: { name: "baju" },
            };
            orderRepository.getById.mockResolvedValue(mockOrder);

            const result = await orderService.getById(1);

            expect(result).toEqual({
                statusCode: 200,
                data: mockOrder,
            });
        });

        it("failed: should return error when order is not found", async() => {
            orderRepository.getById.mockResolvedValue(null);

            const result = await orderService.getById(999);

            expect(result).toEqual({
                statusCode: 400,
                data: {
                    status: "Error",
                    message: "Order tidak ditemukan, mohon diperiksa kembali",
                },
            });
        });
    });

    describe("create", () => {
        it("success: should create a new order and return it", async() => {
            const mockItem = { id: 1, price: 100 };
            const mockUser = { id: 1 };
            const newOrder = {
                user_id: 1,
                item_id: 1,
                qty: 2,
            };
            const createdOrder = {
                id: 1,
                ...newOrder,
                price: 100,
                total: 200,
                status: "Diterima",
            };

            userRepository.getById.mockResolvedValue(mockUser);
            itemRepository.getById.mockResolvedValue(mockItem);
            orderRepository.add.mockResolvedValue(createdOrder);

            const result = await orderService.create(newOrder);

            expect(result).toEqual({
                statusCode: 200,
                data: createdOrder,
            });
        });

        it("failed: should return error when user is not found", async() => {
            const newOrder = { user_id: 999, item_id: 1, qty: 2 };
            userRepository.getById.mockResolvedValue(null);

            const result = await orderService.create(newOrder);

            expect(result).toEqual({
                statusCode: 400,
                data: {
                    status: "Error",
                    message: "User tidak ditemukan, mohon diperiksa kembali",
                },
            });
        });

        it("failed: should return error when item is not found", async() => {
            const newOrder = { user_id: 1, item_id: 999, qty: 2 };
            userRepository.getById.mockResolvedValue({ id: 1 });
            itemRepository.getById.mockResolvedValue(null);

            const result = await orderService.create(newOrder);

            expect(result).toEqual({
                statusCode: 400,
                data: {
                    status: "Error",
                    message: "Item tidak ditemukan, mohon diperiksa kembali",
                },
            });
        });

        it("failed: should return error when qty is invalid", async() => {
            const newOrder = { user_id: 1, item_id: 1, qty: "invalid" };
            userRepository.getById.mockResolvedValue({ id: 1 });
            itemRepository.getById.mockResolvedValue({ id: 1, price: 100 });

            const result = await orderService.create(newOrder);

            expect(result).toEqual({
                statusCode: 400,
                data: {
                    status: "Error",
                    message: "Payload yang dikirim tidak sesuai, mohon diperiksa kembali",
                },
            });
        });
    });

    describe("update", () => {
        it("success: should update order status", async() => {
            const mockOrder = {
                id: 1,
                status: "pending",
            };
            orderRepository.getById.mockResolvedValue(mockOrder);
            orderRepository.update.mockResolvedValue(1);

            const result = await orderService.update({ id: 1, status: "completed" });

            expect(result).toEqual({
                statusCode: 200,
                data: {
                    status: "success",
                    message: "Order berhasil diperbarui",
                },
            });
        });

        it("failed: should return error when order is not found", async() => {
            orderRepository.getById.mockResolvedValue(null);

            const result = await orderService.update({ id: 999, status: "completed" });

            expect(result).toEqual({
                statusCode: 400,
                data: {
                    status: "Error",
                    message: "Order tidak ditemukan, mohon diperiksa kembali",
                },
            });
        });
    });

    describe("delete", () => {
        it("success: should delete order", async() => {
            orderRepository.delete.mockResolvedValue(1);

            const result = await orderService.delete(1);

            expect(result).toEqual({
                statusCode: 200,
                data: {
                    status: "success",
                    message: "Order berhasil dihapus",
                },
            });
        });

        it("failed: should return error when order is not found", async() => {
            orderRepository.delete.mockResolvedValue(0);

            const result = await orderService.delete(999);

            expect(result).toEqual({
                statusCode: 400,
                data: {
                    status: "error",
                    message: "Id tidak ditemukan",
                },
            });
        });
    });
});
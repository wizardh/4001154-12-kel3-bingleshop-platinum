const OrderRepository = require("../order");

describe("OrderRepository", () => {
    const orderRepository = new OrderRepository();

    const orderToCreate = {
        user_id: 1,
        item_id: 1,
        price: 200,
        qty: 2,
        total: 400,
        status: "pending",
    };

    describe("getAll", () => {
        it("success: should return list of orders", async() => {
            const orders = await orderRepository.getAll();

            expect(Array.isArray(orders)).toBe(true);
            expect(orders.length).toBeGreaterThan(0);
            orders.forEach((order) => {
                expect(order).toHaveProperty("id");
                expect(order).toHaveProperty("price");
                expect(order).toHaveProperty("qty");
                expect(order).toHaveProperty("total");
                expect(order).toHaveProperty("status");
                // expect(order.User).toHaveProperty("name");
                // expect(order.User).toHaveProperty("email");
                // expect(order.Item).toHaveProperty("name");
            });
        });
    });

    describe("getById", () => {
        it("success: should return an order by its ID", async() => {
            const createdOrder = await orderRepository.add(orderToCreate);

            const foundOrder = await orderRepository.getById(createdOrder.id);

            console.log(foundOrder);
            expect(foundOrder).toHaveProperty("id", createdOrder.id);
            expect(foundOrder).toHaveProperty("price", createdOrder.price);
            expect(foundOrder).toHaveProperty("qty", createdOrder.qty);
            expect(foundOrder).toHaveProperty("total", createdOrder.total);
            expect(foundOrder).toHaveProperty("status", createdOrder.status);

            await orderRepository.delete(createdOrder.id);
        });

        it("failed: should return null if order with given ID does not exist", async() => {
            const nonExistentId = "999999";

            const foundOrder = await orderRepository.getById(nonExistentId);

            expect(foundOrder).toBeNull();
        });
    });

    describe("add", () => {
        it("success: should add a new order and return the created order with correct fields", async() => {
            const createdOrder = await orderRepository.add(orderToCreate);

            expect(createdOrder).toHaveProperty("id");
            expect(createdOrder.price).toEqual(orderToCreate.price);
            expect(createdOrder.qty).toEqual(orderToCreate.qty);
            expect(createdOrder.total).toEqual(orderToCreate.total);
            expect(createdOrder.status).toEqual(orderToCreate.status);

            await orderRepository.delete(createdOrder.id);
        });

        it("failed: should return an error when required fields are missing", async() => {
            const incompleteOrder = {
                user_id: 1,
            };

            try {
                await orderRepository.add(incompleteOrder);
            } catch (error) {
                expect(error).toHaveProperty("name", "SequelizeValidationError");
            }
        });
    });

    describe("update", () => {
        it("success: should update an existing order and return the number of affected rows", async() => {
            const createdOrder = await orderRepository.add(orderToCreate);

            const dataToUpdate = {
                id: createdOrder.id,
                status: "completed",
            };

            const doUpdate = await orderRepository.update(dataToUpdate);
            const updatedOrder = await orderRepository.getById(createdOrder.id);

            expect(doUpdate[0]).toEqual(1);
            expect(updatedOrder.status).toEqual(dataToUpdate.status);

            await orderRepository.delete(createdOrder.id);
        });

        it("failed: should return an error when updating a non-existent order", async() => {
            const dataToUpdate = {
                id: "9999999",
                status: "completed",
            };

            const doUpdate = await orderRepository.update(dataToUpdate);

            expect(doUpdate[0]).toEqual(0);
        });
    });

    describe("delete", () => {
        it("success: should delete an existing order and return the number of affected rows", async() => {
            const createdOrder = await orderRepository.add(orderToCreate);

            const affectedRows = await orderRepository.delete(createdOrder.id);

            expect(affectedRows).toEqual(1);

            const deletedOrder = await orderRepository.getById(createdOrder.id);
            expect(deletedOrder).toBeNull();
        });

        it("failed: should return an error when trying to delete a non-existent order", async() => {
            const id = "999999";

            const affectedRows = await orderRepository.delete(id);

            expect(affectedRows).toEqual(0);
        });
    });
});
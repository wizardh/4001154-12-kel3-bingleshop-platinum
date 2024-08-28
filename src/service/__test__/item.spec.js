const ItemService = require("../item");

describe("ItemService", () => {
    let itemService;
    let itemRepository;

    beforeEach(() => {
        itemRepository = {
            getAll: jest.fn(),
            getById: jest.fn(),
            add: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };
        itemService = new ItemService(itemRepository);
    });


    describe("getAll", () => {
        // Positive case
        it("success: should return all items", async() => {
            const mockItems = [{
                id: 999,
                name: "Apel",
                price: 100,
                image: "sample.jpg",
            }, ];
            itemRepository.getAll.mockResolvedValue(mockItems);

            const result = await itemService.getAll();

            expect(result).toEqual({
                statusCode: 200,
                data: mockItems,
            });
        });
    });

    describe("getById", () => {
        // Positive case
        it("should return item data when item is found", async() => {
            const mockItem = {
                id: 999,
                name: "Apel",
                price: 100,
                image: "sample.jpg",
            };
            itemRepository.getById.mockResolvedValue(mockItem);

            const result = await itemService.getById(1);

            expect(result).toEqual({
                statusCode: 200,
                data: mockItem,
            });
        });

        // negative case
        it("failed: should return error when item is not found", async() => {
            itemRepository.getById.mockResolvedValue(null);

            const result = await itemService.getById(999);

            expect(result).toEqual({
                statusCode: 400,
                data: {
                    status: "error",
                    message: "Id tidak ditemukan",
                },
            });
        });
    });

    describe("create", () => {
        it("success: should create a new item and return the created item", async() => {
            const newItem = {
                name: "Item 1",
                price: 100,
                image: "image1.png",
            };
            const createdItem = {
                id: 1,
                ...newItem,
            };
            itemRepository.add.mockResolvedValue(createdItem);

            const result = await itemService.create(newItem);

            expect(result).toEqual({
                statusCode: 200,
                data: createdItem,
            });
        });

        it("failed: should return error if the payload is missing required fields", async() => {
            const invalidPayload = {
                name: "Item 2",
                price: "invalid price", // invalid price
                image: "image2.png",
            };

            const result = await itemService.create(invalidPayload);

            expect(result).toEqual({
                statusCode: 400,
                data: {
                    status: "Error",
                    message: "Payload yang dikirim tidak sesuai, mohon diperiksa kembali",
                },
            });
        });

        it("failed: should return error if required fields are missing", async() => {
            const incompletePayload = {
                name: "Item 3",
                price: 150,
                // image is missing
            };

            const result = await itemService.create(incompletePayload);

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
        it("success: should return success when item is successfully updated", async() => {
            const mockItem = {
                id: 99,
                name: "Apel",
                price: 100,
                image: "sample.jpg",
            };
            itemRepository.getById.mockResolvedValue(mockItem);
            itemRepository.update.mockResolvedValue(1);

            const result = await itemService.update({
                id: 1,
                price: 2000,
            });

            expect(result).toEqual({
                statusCode: 200,
                data: {
                    status: "success",
                    message: "Item berhasil diperbarui",
                },
            });
        });

        it("failed: should return error when item is not found", async() => {
            itemRepository.getById.mockResolvedValue(null);

            const result = await itemService.update({
                id: 999,
                price: 200,
            });

            expect(result).toEqual({
                statusCode: 400,
                data: {
                    status: "Error",
                    message: "Item tidak ditemukan, mohon diperiksa kembali",
                },
            });
        });

    });

    describe("delete", () => {
        it("success: should return status 200 when item is successfully deleted", async() => {
            itemRepository.delete.mockResolvedValue(1);

            const result = await itemService.delete(1);

            expect(result).toEqual({
                statusCode: 200,
                data: {
                    status: "success",
                    message: "Item berhasil dihapus",
                },
            });
        });

        it("failed: should return error when item is not found", async() => {
            itemRepository.delete.mockResolvedValue(0);

            const result = await itemService.delete(999);

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
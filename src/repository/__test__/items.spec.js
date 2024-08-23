const ItemRepository = require("../item");

describe("ItemRepository", () => {
    const itemRepository = new ItemRepository();

    const itemToCreate = {
        name: "Sample Item",
        price: 100,
        image: "sample.jpg",
    };


    describe("getAll", () => {
        it("success: should return list of items", async() => {
            const items = await itemRepository.getAll();

            // cek apakah objeknya array
            expect(Array.isArray(items)).toBe(true);

            // cek array tidak kosong
            expect(items.length).toBeGreaterThan(0);

            // cek element di array apa punya expected properties
            items.forEach((item) => {
                expect(item).toHaveProperty("id");
                expect(item).toHaveProperty("name");
                expect(item).toHaveProperty("price");
                expect(item).toHaveProperty("image");
            });
        });
    });

    describe("getById", () => {
        it("success: should return an item by its ID", async() => {
            const createdItem = await itemRepository.add(itemToCreate);

            const foundItem = await itemRepository.getById(createdItem.id);

            // Cek items apakah memiliki properti yang sesuai
            expect(foundItem).toHaveProperty("id", createdItem.id);
            expect(foundItem).toHaveProperty("name", createdItem.name);
            expect(foundItem).toHaveProperty("price", createdItem.price);
            expect(foundItem).toHaveProperty("image", createdItem.image);

            // menghapus berdasarkan id
            await itemRepository.delete(createdItem.id);
        });

        it("failed: should return null if item with given ID does not exist", async() => {
            //mengasumsikan id tidak ada
            const nonExistentId = "999999";

            const foundItem = await itemRepository.getById(nonExistentId);

            expect(foundItem).toBeNull();
        });
    });


    describe("add", () => {
        it("success: should add a new item and return the created item with correct fields", async() => {
            const createdItem = await itemRepository.add(itemToCreate);

            expect(createdItem).toHaveProperty("id");
            expect(createdItem.name).toEqual(itemToCreate.name);
            expect(createdItem.price).toEqual(itemToCreate.price);
            expect(createdItem.image).toEqual(itemToCreate.image);

            // menghapus berdasarkan id
            await itemRepository.delete(createdItem.id);
        });

        it("failed: should return an error when required fields are missing", async() => {
            const incompleteItem = {
                price: 100,
            };

            try {
                await itemRepository.add(incompleteItem);
            } catch (error) {
                expect(error).toHaveProperty("name", "SequelizeValidationError");
            }
        });
    });

    describe("update", () => {
        it("success: should update an existing item and return the number of affected rows", async() => {
            const createdItem = await itemRepository.add(itemToCreate);

            const dataToUpdate = {
                id: createdItem.id,
                price: 200,
                image: "updated.jpg",
            };

            const doUpdate = await itemRepository.update(dataToUpdate);
            const updatedItem = await itemRepository.getById(createdItem.id);

            expect(doUpdate[0]).toEqual(1);
            expect(updatedItem.price).toEqual(dataToUpdate.price);
            expect(updatedItem.image).toEqual(dataToUpdate.image);

            // menghapus berdasarkan id
            await itemRepository.delete(createdItem.id);
        });

        it("failed: should return an error when updating a non-existent item", async() => {
            const dataToUpdate = {
                id: "9999999", // mengasumsikan jika id tidak ada
                price: 200,
                image: "updated.jpg",
            };

            const doUpdate = await itemRepository.update(dataToUpdate);

            expect(doUpdate[0]).toEqual(0);
        });
    });

    describe("delete", () => {
        it("success: should delete an existing item and return the number of affected rows", async() => {
            const createdItem = await itemRepository.add(itemToCreate);

            const affectedRows = await itemRepository.delete(createdItem.id);

            expect(affectedRows).toEqual(1);

            const deletedItem = await itemRepository.getById(createdItem.id);
            expect(deletedItem).toBeNull();
        });

        it("failed: should return an error when trying to delete a non-existent item", async() => {
            const id = "999999"; // mengasumsikan jika id tidak ada

            const affectedRows = await itemRepository.delete(id);

            expect(affectedRows).toEqual(0);
        });
    });
});
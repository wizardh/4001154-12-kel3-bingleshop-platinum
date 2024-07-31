const { items: ItemModel } = require("../../models");

class ItemRepository {
  constructor() {}

  async getAll() {
    const getItems = await ItemModel.findAll();

    return getItems;
  }

  async getById(id) {
    const getItem = await ItemModel.findOne({
      where: {
        id: id,
      },
    });

    return getItem;
  }

  async add(item) {
    const newItem = await ItemModel.create({
      name: item.name,
      price: item.price,
      image: item.image
    });

    return newItem;
  }

  async update(item) {
    const updatedItem = await ItemModel.update(
      { 
        price: item.price,
        image: item.image
      },
      {
        where: {
          id: item.id,
        },
      }
    );
    return updatedItem;
  }

  async delete(id) {
    const deletedItem = await ItemModel.destroy({
      where: {
        id: id,
      },
    });

    return deletedItem;
  }  
}

module.exports = ItemRepository;

const {
  orders: OrderModel,
  users: UserModel,
  items: ItemModel,
} = require("../../models");
class OrderRepository {
  constructor() {}

  async getAll() {
    const getOrders = await OrderModel.findAll({
      include: [
        {
          model: UserModel,
          attributes: ["name", "email"],
        },
        {
          model: ItemModel,
          attributes: ["name"],
        },
      ],
    });

    return getOrders;
  }

  async getById(id) {
    const getOrder = await OrderModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: UserModel,
          attributes: ["name", "email"],
        },
        {
          model: ItemModel,
          attributes: ["name"],
        },
      ],
    });

    return getOrder;
  }

  async add(order) {
    const newOrder = await OrderModel.create({
      user_id: order.user_id,
      item_id: order.item_id,
      price: order.price,
      qty: order.qty,
      total: order.total,
      status: order.status,
    });

    return newOrder;
  }

  async update(order) {
    const updatedOrder = await OrderModel.update(
      { status: order.status },
      {
        where: {
          id: order.id,
        },
      }
    );
    return updatedOrder;
  }

  async delete(id) {
    const deletedOrder = await OrderModel.destroy({
      where: {
        id: id,
      },
    });

    return deletedOrder;
  }
}

module.exports = OrderRepository;

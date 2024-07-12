class OrderService {
  constructor(orderRepository, itemRepositroy, userRepository) {
    this.orderRepository = orderRepository;
    this.itemRepositroy = itemRepositroy;
    this.userRepository = userRepository;
  }

  async getAll() {
    const orders = await this.orderRepository.getAll();

    return {
      statusCode: 200,
      data: orders,
    };
  }

  async getById(id) {
    const order = await this.orderRepository.getById(id);

    return {
      statusCode: 200,
      data: order,
    };
  }

  async create({ user_id, item_id, qty }) {
    // validasi input user_id
    const findUser = await this.userRepository.getById(user_id);
    if (!findUser) {
      return {
        statusCode: 400,
        data: {
          status: "Error",
          message: "User tidak ditemukan, mohon diperiksa kembali",
        },
      };
    }

    // validasi input item_id
    const findItem = await this.itemRepositroy.getById(item_id);
    if (!findItem) {
      return {
        statusCode: 400,
        data: {
          status: "Error",
          message: "Item tidak ditemukan, mohon diperiksa kembali",
        },
      };
    }

    // validasi qty
    if (typeof qty != "number") {
      return {
        statusCode: 400,
        data: {
          status: "Error",
          message: "Payload yang dikirim tidak sesuai, mohon diperiksa kembali",
        },
      };
    }

    let newData = {
      user_id: user_id,
      item_id: item_id,
      price: findItem.price,
      qty: qty,
      total: findItem.price * qty,
      status: "Diterima",
    };

    const createdOrder = await this.orderRepository.add(newData);
    return {
      statusCode: 200,
      data: createdOrder,
    };
  }

  async update({ id, status }) {
    // validasi input id
    const findOrder = await this.orderRepository.getById(id);
    if (!findOrder) {
      return {
        statusCode: 400,
        data: {
          status: "Error",
          message: "Order tidak ditemukan, mohon diperiksa kembali",
        },
      };
    }

    let newData = {
      id: id,
      status: status,
    };

    const updatedOrder = await this.orderRepository.update(newData);
    if (updatedOrder > 0) {
      return {
        statusCode: 200,
        data: {
          status: "success",
          message: "Order berhasil diperbarui",
        },
      };
    } else {
      return {
        statusCode: 400,
        data: {
          status: "error",
          message: "Tidak ada data yang diperbarui",
        },
      };
    }
  }

  async delete(id) {
    const deletedOrder = await this.orderRepository.delete(id);

    if (deletedOrder == 1) {
      return {
        statusCode: 200,
        data: {
          status: "success",
          message: "Order berhasil dihapus",
        },
      };
    } else {
      return {
        statusCode: 400,
        data: {
          status: "error",
          message: "Id tidak ditemukan",
        },
      };
    }
  }
}

module.exports = OrderService;

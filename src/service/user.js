class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAll() {
    const users = await this.userRepository.getAll();

    return {
      statusCode: 200,
      data: users,
    };
  }

  async getById(id) {
    const user = await this.userRepository.getById(id);

    if (user) {
      return {
        statusCode: 200,
        data: user,
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

  async getByEmail(email) {
    const user = await this.userRepository.getByEmail(email);

    if (user) {
      return {
        statusCode: 200,
        data: user,
      };
    } else {
      return {
        statusCode: 400,
        data: {
          status: "error",
          message: "Email tidak ditemukan",
        },
      };
    }
  }

  async update({ id, password }) {
    // validasi input id
    const findUser = await this.userRepository.getById(id);
    if (findUser.length == 0) {
      return {
        statusCode: 400,
        data: {
          status: "Error",
          message: "User tidak ditemukan, mohon diperiksa kembali",
        },
      };
    }

    let newData = {
      id: id,
      password: password,
    };

    const updatedUser = await this.userRepository.update(newData);
    if (updatedUser > 0) {
      return {
        statusCode: 200,
        data: {
          status: "success",
          message: "User berhasil diperbarui",
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
    const deletedUser = await this.userRepository.delete(id);

    if (deletedUser == 1) {
      return {
        statusCode: 200,
        data: {
          status: "success",
          message: "User berhasil dihapus",
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

module.exports = UserService;

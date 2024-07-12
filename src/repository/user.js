const { users: UserModel } = require("../../models");

class UserRepository {
  constructor() {}

  async getAll() {
    const getUsers = await UserModel.findAll();

    return getUsers;
  }

  async getById(id) {
    const getUser = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    return getUser;
  }

  async getByEmail(email) {
    const getUser = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    return getUser;
  }

  async add(user) {
    const newUser = await UserModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return newUser;
  }

  async update(user) {
    const updatedUser = await UserModel.update(
      { password: user.password },
      {
        where: {
          id: user.id,
        },
      }
    );
    return updatedUser;
  }

  async delete(id) {
    const deletedUser = await UserModel.destroy({
      where: {
        id: id,
      },
    });

    return deletedUser;
  }
}

module.exports = UserRepository;

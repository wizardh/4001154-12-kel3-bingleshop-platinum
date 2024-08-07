const UserRepository = require("../user");

describe("insert", () => {
  const userRepository = new UserRepository();
  const userToCreate = {
    name: "Roby",
    email: "roby@gmail.com",
    password: "roby123",
    role: "user",
  };

  // Positive case
  it("success: should return the created user", async () => {
    const createdUser = await userRepository.add(userToCreate);

    await userRepository.deleteByEmail(userToCreate.email);

    expect(createdUser.name).toEqual(userToCreate.name);
    expect(createdUser.email).toEqual(userToCreate.email);
    expect(createdUser.password).toEqual(userToCreate.password);
  });

  // Negative case
  it("failed: should return error duplicate email", async () => {
    try {
      await userRepository.add(userToCreate);
      await userRepository.add(userToCreate);
    } catch (error) {
      await userRepository.deleteByEmail(userToCreate.email);

      expect(error.errors[0].message).toEqual("email must be unique");
    }
  });
});

describe("getALl", () => {
  const userRepository = new UserRepository();

  // Positive case
  it("success: should return list of users", async () => {
    const users = await userRepository.getAll();

    // cek apakah objeknya array
    expect(Array.isArray(users)).toBe(true);

    // cek array tidak kosong
    expect(users.length).toBeGreaterThan(0);

    // cek element di array apa punya expected properties
    users.forEach((user) => {
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("email");
    });
  });
});

describe("getById", () => {
  const userRepository = new UserRepository();
  const userToCreate = {
    name: "getById",
    email: "getById@gmail.com",
    password: "gbi123",
    role: "admin",
  };

  // Positive case
  it("success: should return one user by id", async () => {
    const createdUser = await userRepository.add(userToCreate);
    const user = await userRepository.getById(createdUser.id);
    await userRepository.deleteByEmail(createdUser.email);

    // cek isi
    expect(user.id).toEqual(createdUser.id);
    expect(user.name).toEqual(createdUser.name);
    expect(user.email).toEqual(createdUser.email);
    expect(user.role).toEqual(createdUser.role);
  });
});

describe("getByEmail", () => {
  const userRepository = new UserRepository();
  const userToCreate = {
    name: "getByEmail",
    email: "getByEmail@gmail.com",
    password: "gbe123",
    role: "admin",
  };

  // Positive case
  it("success: should return one user by email", async () => {
    const createdUser = await userRepository.add(userToCreate);
    const user = await userRepository.getByEmail(createdUser.email);
    await userRepository.deleteByEmail(createdUser.email);

    expect(user.id).toEqual(createdUser.id);
    expect(user.name).toEqual(createdUser.name);
    expect(user.email).toEqual(createdUser.email);
    expect(user.role).toEqual(createdUser.role);
  });
});

describe("update", () => {
  const userRepository = new UserRepository();
  const userToCreate = {
    name: "update",
    email: "update@gmail.com",
    password: "update123",
    role: "user",
    verified: false,
  };

  // Positive case
  it("success: should update one user by id", async () => {
    const createdUser = await userRepository.add(userToCreate);

    expect(createdUser.name).toEqual(userToCreate.name);
    expect(createdUser.email).toEqual(userToCreate.email);
    expect(createdUser.role).toEqual(userToCreate.role);
    expect(createdUser.verified).toEqual(userToCreate.verified);

    const dataToUpdate = {
      id: createdUser.id,
      verified: true,
    };

    const doUpdate = await userRepository.update(dataToUpdate);
    const updatedUser = await userRepository.getById(createdUser.id);

    await userRepository.deleteByEmail(createdUser.email);
    expect(doUpdate[0]).toEqual(1);
    expect(updatedUser.verified).toEqual(dataToUpdate.verified);
  });

  // Negative case
  it("failed: id is not found", async () => {
    const dataToUpdate = {
      id: "9999999",
      verified: true,
    };

    const doUpdate = await userRepository.update(dataToUpdate);

    console.log("Ekspektasi ", doUpdate);
    expect(doUpdate[0]).toEqual(0);
  });
});

describe("delete", () => {
  const userRepository = new UserRepository();
  const userToCreate = {
    name: "delete",
    email: "delete@gmail.com",
    password: "delete123",
    role: "user",
    verified: false,
  };

  // Positive case
  it("success: should delete one user by id", async () => {
    const createdUser = await userRepository.add(userToCreate);

    expect(createdUser.name).toEqual(userToCreate.name);
    expect(createdUser.email).toEqual(userToCreate.email);
    expect(createdUser.role).toEqual(userToCreate.role);
    expect(createdUser.verified).toEqual(userToCreate.verified);

    const id = createdUser.id;
    const doDelete = await userRepository.delete(id);
    console.log("Ekspektasi:", doDelete);
    expect(doDelete).toEqual(1);
  });

  // Negative case
  it("failed: id is not found", async () => {
    const id = "999999";
    const doDelete = await userRepository.delete(id);

    expect(doDelete).toEqual(0);
  });
});

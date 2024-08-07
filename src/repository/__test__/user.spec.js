const UserRepository = require("../user");

describe('insert', () => {
  const userRepository = new UserRepository();
  const userToCreate = {
    name: "Roby",
    email: "roby@gmail.com",
    password: "roby123"
  }

  // Positive case
  it('success: should return the created user', async () => {
    const createdUser = await userRepository.add(userToCreate);

    await userRepository.deleteByEmail(userToCreate.email);

    expect(createdUser.name).toEqual(userToCreate.name);
    expect(createdUser.email).toEqual(userToCreate.email);
    expect(createdUser.password).toEqual(userToCreate.password);
  });

  // Negative case
  it('failed: should return error duplicate email', async () => {
    try {

      await userRepository.add(userToCreate);
      await userRepository.add(userToCreate);
    } catch (error) {
      await userRepository.deleteByEmail(userToCreate.email);

      expect(error.errors[0].message).toEqual("email must be unique");
    }
  });
});
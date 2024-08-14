const UserService = require("../user");

describe("UserService", () => {
  let userService;
  let userRepository;

  beforeEach(() => {
    userRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      getByEmail: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    userService = new UserService(userRepository);
  });

  describe("getAll", () => {
    // Positive case
    it("success: should return all users", async () => {
      const mockUsers = [
        {
          id: 99,
          name: "Adhi",
          email: "adhi@gmail.com",
          password: "123xyz",
          role: "admin",
          verification_code: "12345",
          verified: true,
        },
      ];
      userRepository.getAll.mockResolvedValue(mockUsers);

      const result = await userService.getAll();

      expect(result).toEqual({
        statusCode: 200,
        data: mockUsers,
      });
    });
  });

  describe("getById", () => {
    // Positive case
    it("should return user data when user is found", async () => {
      const mockUser = {
        id: 99,
        name: "Adhi",
        email: "adhi@gmail.com",
        password: "123xyz",
        role: "admin",
        verification_code: "12345",
        verified: true,
      };
      userRepository.getById.mockResolvedValue(mockUser);

      const result = await userService.getById(1);

      expect(result).toEqual({
        statusCode: 200,
        data: mockUser,
      });
    });

    // negative case
    it("failed: should return error when user is not found", async () => {
      userRepository.getById.mockResolvedValue(null);

      const result = await userService.getById(999);

      expect(result).toEqual({
        statusCode: 400,
        data: {
          status: "error",
          message: "Id tidak ditemukan",
        },
      });
    });
  });

  describe("getByEmail", () => {
    it("success: should return user data when user is found", async () => {
      const mockUser = {
        id: 99,
        name: "Adhi",
        email: "adhi@gmail.com",
        password: "123xyz",
        role: "admin",
        verification_code: "12345",
        verified: true,
      };
      userRepository.getByEmail.mockResolvedValue(mockUser);

      const result = await userService.getByEmail("adhi@gmail.com");

      expect(result).toEqual({
        statusCode: 200,
        data: mockUser,
      });
    });

    it("failed: should return error when user is not found", async () => {
      userRepository.getByEmail.mockResolvedValue(null);

      const result = await userService.getByEmail("notfound@example.com");

      expect(result).toEqual({
        statusCode: 400,
        data: {
          status: "error",
          message: "Email tidak ditemukan",
        },
      });
    });
  });

  describe("update", () => {
    it("success: should return success when user is successfully updated", async () => {
      const mockUser = {
        id: 99,
        name: "Adhi",
        email: "adhi@gmail.com",
        password: "123xyz",
        role: "admin",
        verification_code: "12345",
        verified: true,
      };
      userRepository.getById.mockResolvedValue(mockUser);
      userRepository.update.mockResolvedValue(1);

      const result = await userService.update({
        id: 1,
        password: "!@#123",
      });

      expect(result).toEqual({
        statusCode: 200,
        data: {
          status: "success",
          message: "User berhasil diperbarui",
        },
      });
    });

    it("failed: should return error when user is not found", async () => {
      userRepository.getById.mockResolvedValue(null);

      const result = await userService.update({
        id: 999,
        password: "newpassword",
      });

      expect(result).toEqual({
        statusCode: 400,
        data: {
          status: "Error",
          message: "User tidak ditemukan, mohon diperiksa kembali",
        },
      });
    });

    it("success: should return error when no user data is updated", async () => {
      const mockUser = {
        id: 99,
        name: "Adhi",
        email: "adhi@gmail.com",
        password: "123xyz",
        role: "admin",
        verification_code: "12345",
        verified: true,
      };

      userRepository.getById.mockResolvedValue(mockUser);
      userRepository.update.mockResolvedValue(0);

      const result = await userService.update({
        id: 1,
        password: "123xyz",
      });

      expect(result).toEqual({
        statusCode: 400,
        data: {
          status: "error",
          message: "Tidak ada data yang diperbarui",
        },
      });
    });
  });

  describe("delete", () => {
    it("success: should return status 200 when user is successfully deleted", async () => {
      userRepository.delete.mockResolvedValue(1);

      const result = await userService.delete(1);

      expect(result).toEqual({
        statusCode: 200,
        data: {
          status: "success",
          message: "User berhasil dihapus",
        },
      });
    });

    it("failed: should return error when user is not found", async () => {
      userRepository.delete.mockResolvedValue(0);

      const result = await userService.delete(999);

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

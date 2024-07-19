const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register({ name, email, password }) {
        // validasi input
        if (!name || !email || !password) {
            return {
                statusCode: 400,
                data: {
                    status: "Error",
                    message: "Payload yang dikirim tidak sesuai, mohon diperiksa kembali",
                },
            };
        }
        const salt = 10;
        const encryptedPassword = bcrypt.hashSync(password, salt)

        let newData = {
            name: name,
            email: email,
            password: encryptedPassword,
        };

        const findUser = await this.userRepository.getByEmail(email);
        if (!findUser) {
            const createdUser = await this.userRepository.add(newData);
            return {
                statusCode: 201,
                data: {
                    status: "success",
                    user: createdUser,
                },
            };
        } else {
            return {
                statusCode: 400,
                data: {
                    status: "error",
                    message: "Email sudah terdaftar, silakan coba dengan email lain",
                },
            };
        }
    }

    async login({ email, password }) {
        const findUser = await this.userRepository.getByEmail(email);
        const isValid = bcrypt.compareSync(password, findUser.password);

        if (findUser) {
            if (isValid) {
                const jwtSecret = 'SECRET';
                const jwtExpireTime = '24h';

                const token = jwt.sign({
                        email: findUser.email,
                    },
                    jwtSecret, {
                        expiresIn: jwtExpireTime,
                    }
                );
                return {
                    statusCode: 200,
                    data: {
                        status: "success",
                        message: "Login berhasil",
                        token: token
                    },
                };
            } else {
                return {
                    statusCode: 400,
                    data: {
                        status: "error",
                        message: "Email atau password salah",
                        token: null
                    },
                };
            }
        } else {
            return {
                statusCode: 400,
                data: {
                    status: "error",
                    message: "Email atau password salah",
                },
            };
        }
    }
}

module.exports = AuthService;
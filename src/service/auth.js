const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    constructor(userRepository, mailRepository) {
        this.userRepository = userRepository;
        this.mailRepository = mailRepository;
    }

    async register({ name, email, password, role }) {
        // validasi input
        if (!name || !email || !password || !role) {
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
            role: role
        };

        const findUser = await this.userRepository.getByEmail(email);
        if (!findUser) {
            const verificationCode = Math.random().toString(10).substring(2,8);
            newData.verification_code = verificationCode;

            const createdUser = await this.userRepository.add(newData);

            // integrate mailer
            const verificationEmailHtml = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Account Verification</title>
                    <style>
                        body { font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 50px; }
                        .container { background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
                        .verification-code { font-size: 24px; font-weight: bold; color: #333; margin-top: 10px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Verifikasi Akun Anda</h1>
                        <p>Halo ${name}, selamat datang di BingleShop!</p>
                        <p>Kode verifikasi Anda adalah:</p>
                        <div class="verification-code">${verificationCode}</div>
                    </div>
                </body>
                </html>
            `;            

            const mail = {
                from: "kelompok3.bej12@gmail.com",
                to: email,
                subject: "Verifikasi Registrasi Akun BingleShop",
                html: verificationEmailHtml
            }
            
            await this.mailRepository.sendMail(mail);

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
        if (findUser) {
            const isVerified = findUser.verified;
            if (!isVerified){
                return {
                    statusCode: 400,
                    data: {
                        status: "error",
                        message: "Email belum diverifikasi!",
                        token: null
                    },
                };
            }
            const isValid = bcrypt.compareSync(password, findUser.password); // validate password after email found - Adhi
            if (isValid) {
                const jwtSecret = 'SECRET';
                const jwtExpireTime = '24h';

                const token = jwt.sign({
                        email: findUser.email,
                        role: findUser.role,
                        verified: findUser.verified
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

    async verify({ email, code }) {
        const findUser = await this.userRepository.getByEmail(email);
        if (findUser) {
            const isValid = (code === findUser.verification_code); // validate code
            if (isValid) {
                let updateVerified = {
                    id: findUser.id,
                    verified: true,
                };
                await this.userRepository.update(updateVerified);
              
                return {
                    statusCode: 200,
                    data: {
                        status: "success",
                        message: "Verifikasi berhasil"
                    },
                };
            } else {
                return {
                    statusCode: 400,
                    data: {
                        status: "error",
                        message: "Email atau kode verifikasi salah"
                    },
                };
            }
        } else {
            return {
                statusCode: 400,
                data: {
                    status: "error",
                    message: "Email atau kode verifikasi salah",
                },
            };
        }
    }    
}

module.exports = AuthService;
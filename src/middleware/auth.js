const jwt = require('jsonwebtoken');

class Auth {
    static authenticate(req, res, next) {
        // TODO: cek apakah user punya token/ga & ambil payloadnya
        // 1. get token dari header
        const authHeader = req.get('Authorization');

        // 2. check token existence
        let token;
        if (authHeader && authHeader.startsWith('Bearer'))
            token = authHeader.split(' ')[1];
        else
            return res.status(401).send({
                message: 'Silahkan login',
                data: null,
            });

        // 3. validate token
        const jwtSecret = 'SECRET';
        const payload = jwt.verify(token, jwtSecret);
        req.token = payload;

        if (!payload.verified) {
            return res.status(401).send({
                message: 'User belum diverifikasi',
                data: null,
            });
        } else {
            next();
        }
    }

    static checkUser(req, res, next) {
        // TODO: pastikan user yang masuk payloadnya adalah javid@gmail.com
        if (req.userEmail === 'ismail1@gmail.com') {
            next();
        } else {
            return res.status(401).send({
                message: 'User bukan ismail1',
                data: null,
            });
        }

    }

    static checkRoleUser(req, res, next) {
        // req.token dari authenticate
        if (!req.token) {
            return res.status(401).send({
                message: 'Anda tidak memiliki akses',
                data: null,
            });
        }

        const userRole = req.token.role;
        if (userRole === 'admin' || userRole === 'user') {
            next();
        } else {
            return res.status(401).send({
                message: 'Anda tidak memiliki akses',
                data: null,
            });
        }
    }    

    static checkRoleAdmin(req, res, next) {
        if (!req.token) {
            return res.status(401).send({
                message: 'Anda tidak memiliki akses',
                data: null,
            });
        }

        const userRole = req.token.role;
        if (userRole === 'admin') {
            next();
        } else {
            return res.status(401).send({
                message: 'Anda tidak memiliki akses',
                data: null,
            });
        }
    }    
}

module.exports = Auth;
class AuthHandler {
  constructor(authService) {
    this.authService = authService;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.verify = this.verify.bind(this);

  }

  async register(req, res) {
    const newUser = req.body;
    const serviceRes = await this.authService.register(newUser);

    res.status(serviceRes.statusCode).send(serviceRes.data);
  }

  async login(req, res) {
    const loginCreds = {
      email: req.body["email"],
      password: req.body["password"],
    };
    const serviceRes = await this.authService.login(loginCreds);
    
    res.status(serviceRes.statusCode).send(serviceRes.data);
  }

  async verify(req, res) {
    const verificationCreds = {
      email: req.body["email"],
      code: req.body["code"],
    };
    const serviceRes = await this.authService.verify(verificationCreds);
    
    res.status(serviceRes.statusCode).send(serviceRes.data);
  }  
}

module.exports = AuthHandler;

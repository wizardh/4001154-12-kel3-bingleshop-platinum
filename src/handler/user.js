class UserHandler {
  constructor(userService) {
    this.userService = userService;

    this.getAll = this.getAll.bind(this);
    this.getByEmail = this.getByEmail.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    const serviceRes = await this.userService.getAll();
    res.status(serviceRes.statusCode).send(serviceRes.data);
  }

  async getByEmail(req, res) {
    const email = req.params.email;
    const serviceRes = await this.userService.getByEmail(email);
    res.status(serviceRes.statusCode).send(serviceRes.data);
  }

  async getById(req, res) {
    const id = req.params.id;
    const serviceRes = await this.userService.getById(id);
    res.status(serviceRes.statusCode).send(serviceRes.data);
  }

  async update(req, res) {
    const id = req.params.id;
    let user = req.body;
    user.id = id;
    const serviceRes = await this.userService.update(user);

    res.status(serviceRes.statusCode).send(serviceRes.data);
  }

  async delete(req, res) {
    const id = req.params.id;
    const serviceRes = await this.userService.delete(id);
    res.status(serviceRes.statusCode).send(serviceRes.data);
  }
}

module.exports = UserHandler;

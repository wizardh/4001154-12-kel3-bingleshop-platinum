class OrderHandler {
  constructor(orderService) {
    this.orderService = orderService;

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    const serviceRes = await this.orderService.getAll();

    res.status(serviceRes.statusCode).send(serviceRes.data);
  }

  async create(req, res) {
    const order = req.body;
    const serviceRes = await this.orderService.create(order);

    res.status(serviceRes.statusCode).send(serviceRes.data);
  }

  async getById(req, res) {
    const id = req.params.id;
    const serviceRes = await this.orderService.getById(id);

    res.status(serviceRes.statusCode).send(serviceRes.data);
  }

  async update(req, res) {
    const order = req.body;
    const serviceRes = await this.orderService.update(order);

    res.status(serviceRes.statusCode).send(serviceRes.data);
  }

  async delete(req, res) {
    const id = req.params.id;
    const serviceRes = await this.orderService.delete(id);
    res.status(serviceRes.statusCode).send(serviceRes.data);
  }
}

module.exports = OrderHandler;

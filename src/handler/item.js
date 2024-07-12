class ItemHandler {
  constructor(itemService) {
    this.itemService = itemService;

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    const serviceRes = await this.itemService.getAll();

    res.status(serviceRes.statusCode).send(serviceRes.data);
  }

  async getById(req, res) {
    const id = req.params.id;
    const serviceRes = await this.itemService.getById(id);

    res.status(serviceRes.statusCode).send(serviceRes.data);
  }

  async create(req, res) {
    const item = req.body;
    const serviceRes = await this.itemService.create(item);

    res.status(serviceRes.statusCode).send(serviceRes.data);
  }

  async update(req, res) {
    const item = req.body;
    const serviceRes = await this.itemService.update(item);

    res.status(serviceRes.statusCode).send(serviceRes.data);
  }

  async delete(req, res) {
    const id = req.params.id;
    const serviceRes = await this.itemService.delete(id);

    res.status(serviceRes.statusCode).send(serviceRes.data);
  }
}

module.exports = ItemHandler;

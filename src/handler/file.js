class FileHandler {
  constructor(fileService) {
    this.fileService = fileService;

    this.upload = this.upload.bind(this);
  }

  async upload(req, res) {
    const serviceRes = await this.fileService.upload(req.file);

    res.status(serviceRes.statusCode).send(serviceRes.data);
  }
}

module.exports = FileHandler;

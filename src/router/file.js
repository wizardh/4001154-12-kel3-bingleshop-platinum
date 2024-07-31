const express = require('express');

const FileHandler = require('../handler/file');
const FileService = require('../service/file');

//middleware multer
const uploadMemory = require('../../utils/uploadFileMemory');

const router = express.Router();
const fileService = new FileService();
const fileHandler = new FileHandler(fileService);

// key di body: file
router.post('/upload', uploadMemory.single("file"), (req, res) => fileHandler.upload(req, res));

module.exports = router;
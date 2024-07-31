const cloudinary = require('../../config/cloudinary')

class FileService {
  
  async upload(file) {
    if (!file) {
      return {
          statusCode: 400,
          data: {
              status: "Error",
              message: "File tidak ditemukan!",
          },
      };
    }
    
    const fileBuffer = file.buffer.toString('base64');
    const fileString = `data:${file.mimetype};base64,${fileBuffer}`;
    
    const uploadedFile = await cloudinary.uploader.upload(fileString);
    if (uploadedFile) {
        return {
            statusCode: 201,
            data: {
                status: "success",
                url: uploadedFile.secure_url,
            },
        };
    } else {
        return {
            statusCode: 400,
            data: {
                status: "error",
                message: "Ada error lainnya",
            },
        };
    }

  }
}

module.exports = FileService;
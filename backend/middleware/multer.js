const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/products';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir); // Folder to save images
  },
  filename: function (req, file, cb) {
    // Extract extension from original name
    let ext = path.extname(file.originalname).toLowerCase();

    // Fallback if no extension is detected
    if (!ext) {
      const mimeToExt = {
        'image/jpeg': '.jpg',
        'image/jpeg': '.jpeg',
        'image/webp': '.webp',
        'image/png': '.png',
        'image/gif': '.gif',
      };
      ext = mimeToExt[file.mimetype] || '.jpg'; // Default to .jpg if mime type is known
    }

    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + ext;

    cb(null, filename); // Pass the complete filename
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
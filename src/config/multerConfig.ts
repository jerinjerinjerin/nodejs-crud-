import { Request } from 'express';
import multer from 'multer';
import path from 'path';

interface FileRequest extends Request {
  file?: Express.Multer.File;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // The folder to store uploaded files
  },
  filename: (req, file, cb) => {
    // Save the file with a unique name
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req: FileRequest, file: Express.Multer.File, cb: any) => {
  // Filter for images only (png, jpeg, jpg)
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only .png, .jpg, and .jpeg format allowed!'), false); // Reject if not an image
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit the file size to 5MB
});

export default upload;

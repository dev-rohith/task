import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
configDotenv();
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."),
      false
    );
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Cloudinary upload middleware
const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) {
    return next(new Error("No file uploaded"));
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "product_uploads",
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    });

    req.imageUrl = result.secure_url;
    req.cloudinaryPublicId = result.public_id;

    //  Removing local file after upload
    fs.unlinkSync(req.file.path);

    next();
  } catch (error) {
    next(error);
  }
};

// Error handling middleware
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: "File upload error",
      message: err.message,
    });
  } else if (err) {
    return res.status(500).json({
      error: "Upload failed",
      message: err.message,
    });
  }
  next();
};

export { upload, uploadToCloudinary, handleUploadErrors };

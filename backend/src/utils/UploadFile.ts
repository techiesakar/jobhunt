import * as multer from "multer";
import { Request } from "express";
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, "src/public");
  },
  filename: function (re: Request, file: Express.Multer.File, cb) {
    const fileExtension = file.originalname.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const uniqueFilename = `${uniqueSuffix}.${fileExtension}`;
    cb(null, uniqueFilename);
  },
});

// Multer filter
const multerFilter = (req, file: Express.Multer.File, cb) => {
  const fileType = /jpeg|jpg|png/;
  const mimetype = fileType.test(file.mimetype);
  const fileExtension = file.originalname.split(".").pop();
  if (mimetype && fileExtension) {
    cb(null, true);
  } else {
    cb(new Error("Not supported file"), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
});

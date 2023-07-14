import { v2 as cloudinary } from "cloudinary";
import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
cloudinary.config({
  cloud_name: "dv1dxfek7",
  api_key: "915212439914959",
  api_secret: "1GmyjvSnwqdfU3PNIe4R1TA3LH8",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images_noname",
    format: "png",
  },
});
const uploadImage = async (req, res) => {
  try {
    const images = req.files.map((file) => file?.path | "");
    if (!images || images.length == 0) {
      return res
        .status(200)
        .json({ message: "Kiểm tra phần dữ liệu đầu vào", req });
    }
    return res.json({ urls: images });
  } catch (error) {
    return res.status(200).json({
      message: "Lỗi",
      error,
    });
  }
};

const upload = multer({ storage: storage });
const router = express.Router();
router.post("/images/upload", upload.array("images", 10), uploadImage);

export default router;

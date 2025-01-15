import { IController } from "../utils/icontroller";
import { ExtendedRequest, verifyToken } from "../middlewares/auth";
import express, { Response, Router } from "express";
import axios from "axios";
import DB from "../utils/db-client";
import { isValidId } from "../utils/validate";
import multer from "multer";
import FormData from "form-data";

// Image upload configuration
// const IMGBB_API_KEY = "ed6fbd4725a6f8bd7eecdc3a334a37e5";
const IMGBB_API_KEY = "ed6fbd4725a6f8bd7eecdc3a334a37e5";

const upload = multer({ storage: multer.memoryStorage() }); // In-memory storage

class ImageController implements IController {
  public router: Router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post(
      "/image/create",
      verifyToken,
      upload.single("image"), // Use 'image' as the field name in the form-data
      this.createImage
    );
    this.router.delete("/image/:id", verifyToken, this.deleteImage);
    this.router.put("/image/:id", verifyToken, upload.none(), this.updateImage); // If you don't want to upload a new image in update
    this.router.get("/image/list", verifyToken, this.getImageList);
    this.router.get("/image/:id", verifyToken, this.getImageDetail);
    this.router.get("/image/last", verifyToken, this.getLastUploadedImage); // Yangi endpoint
  }

  createImage = async (req: ExtendedRequest, res: Response) => {
    try {
      if (!req.file || !req.file.buffer) {
        throw { status: 400, message: "No image file uploaded" };
      }

      // FormData ob'ektini yaratamiz
      const form = new FormData();
      form.append("image", req.file.buffer, req.file.originalname); // Rasmni form-data shaklida qo'shamiz
      form.append("key", IMGBB_API_KEY); // API kalitini qo'shamiz

      // API ga yuborish uchun request yuboramiz
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        form,
        {
          headers: {
            ...form.getHeaders(), // FormData uchun kerakli headerlarni qo'shamiz
          },
        }
      );

      console.log(response.data);

      const imageUrl = response.data.data.url;

      // Agar user_id ustuni kerak emas bo'lsa, quyidagi so'rovni yangilash
      const result = await DB.execute(
        `INSERT INTO Images (url) VALUES (:url)`,
        {
          url: imageUrl,
        }
      );

      return res.status(201).json({
        message: "Image uploaded successfully",
        image_id: result.insertId,
        url: imageUrl,
      });
    } catch (e: any) {
      return res.status(e.status || 500).json({
        error: e.message || "Internal server error",
      });
    }
  };

  deleteImage = async (req: ExtendedRequest, res: Response) => {
    try {
      const imageId = req.params.id;

      if (!isValidId(imageId)) {
        throw { status: 400, message: "Invalid image ID" };
      }

      const image = await DB.query(`SELECT * FROM Images WHERE id = :id`, {
        id: imageId,
      });

      if (image.length === 0) {
        throw { status: 404, message: "Image not found" };
      }

      await DB.execute(`DELETE FROM Images WHERE id = :id`, { id: imageId });

      return res.status(200).json({
        message: "Image deleted successfully",
      });
    } catch (e: any) {
      return res.status(e.status || 500).json({
        error: e.message || "Internal server error",
      });
    }
  };

  updateImage = async (req: ExtendedRequest, res: Response) => {
    try {
      const imageId = req.params.id;

      if (!isValidId(imageId)) {
        throw { status: 400, message: "Invalid image ID" };
      }

      const image = await DB.query(`SELECT * FROM Images WHERE id = :id`, {
        id: imageId,
      });

      if (image.length === 0) {
        throw { status: 404, message: "Image not found" };
      }

      // No update for image file itself in this example
      await DB.execute(`UPDATE Images SET title = title WHERE id = :id`, {
        id: imageId,
      });

      return res.status(200).json({
        message: "Image updated successfully",
      });
    } catch (e: any) {
      return res.status(e.status || 500).json({
        error: e.message || "Internal server error",
      });
    }
  };

  getImageList = async (req: ExtendedRequest, res: Response) => {
    try {
      const images = await DB.query(
        `SELECT id, url FROM Images ORDER BY id DESC`
      );

      return res.status(200).json({
        images,
      });
    } catch (e: any) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  };

  getImageDetail = async (req: ExtendedRequest, res: Response) => {
    try {
      const imageId = req.params.id;

      if (!isValidId(imageId)) {
        throw { status: 400, message: "Invalid image ID" };
      }

      const image = await DB.query(
        `SELECT id, url FROM Images WHERE id = :id`,
        {
          id: imageId,
        }
      );

      if (image.length === 0) {
        throw { status: 404, message: "Image not found" };
      }

      return res.status(200).json({
        image: image[0],
      });
    } catch (e: any) {
      return res.status(e.status || 500).json({
        error: e.message || "Internal server error",
      });
    }
  };

  getLastUploadedImage = async (req: ExtendedRequest, res: Response) => {
    try {
      // Oxirgi yuklangan rasmni olish
      const result = await DB.query(
        `SELECT id, url FROM Images WHERE id = (SELECT MAX(id) FROM Images)`
      );

      console.log("Last uploaded image:", result); // Konsolga oxirgi yuklangan rasmnini tekshirish

      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "No images found",
        });
      }

      // URL'ni qaytarish
      return res.status(200).json({
        imageUrl: result[0]?.url, // Natija mavjudligini tekshirish
      });
    } catch (e: any) {
      console.error("Error fetching last uploaded image:", e); // Konsolga xato chiqish
      return res.status(e?.status || 500).json({
        error:
          e?.message ||
          "An unexpected error occurred while fetching the last image.",
      });
    }
  };
}

export default ImageController;

import { IController } from "../utils/icontroller";
import { ExtendedRequest, verifyToken } from "../middlewares/auth";
import express, { Response, Router } from "express";
import axios from "axios";
import DB from "../utils/db-client";
import { isValidId } from "../utils/validate";
import multer from "multer";
import FormData from "form-data";

// Image upload configuration
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
    this.router.put(
      "/image/:id",
      verifyToken,
      upload.single("image"),
      this.updateImage
    ); // Image update with new file
    this.router.get("/image/list", verifyToken, this.getImageList);
    this.router.get("/image/:id", verifyToken, this.getImageDetail);
    this.router.put("/image/active/:id", verifyToken, this.setActiveImage); // Set isActive flag
  }

  // Create a new image
  createImage = async (req: ExtendedRequest, res: Response) => {
    try {
      if (!req.file || !req.file.buffer) {
        throw { status: 400, message: "No image file uploaded" };
      }

      // FormData object for imgBB
      const form = new FormData();
      form.append("image", req.file.buffer, req.file.originalname); // Adding the image to the form-data
      form.append("key", IMGBB_API_KEY); // Adding the API key

      // Sending request to imgBB API
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        form,
        {
          headers: {
            ...form.getHeaders(),
          },
        }
      );

      console.log(response.data);

      const imageUrl = response.data.data.url;

      // Insert the image URL into the IntroductionImages table
      const result = await DB.execute(
        `INSERT INTO IntroductionImages (url, isActive) VALUES (:url, :isActive)`,
        {
          url: imageUrl,
          isActive: false, // Default isActive is false
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

  // Delete image
  deleteImage = async (req: ExtendedRequest, res: Response) => {
    try {
      const imageId = req.params.id;

      if (!isValidId(imageId)) {
        throw { status: 400, message: "Invalid image ID" };
      }

      const image = await DB.query(
        `SELECT * FROM IntroductionImages WHERE id = :id`,
        {
          id: imageId,
        }
      );

      if (image.length === 0) {
        throw { status: 404, message: "Image not found" };
      }

      await DB.execute(`DELETE FROM IntroductionImages WHERE id = :id`, {
        id: imageId,
      });

      return res.status(200).json({
        message: "Image deleted successfully",
      });
    } catch (e: any) {
      return res.status(e.status || 500).json({
        error: e.message || "Internal server error",
      });
    }
  };

  // Update image (including the image itself)
  updateImage = async (req: ExtendedRequest, res: Response) => {
    try {
      const imageId = req.params.id;

      if (!isValidId(imageId)) {
        throw { status: 400, message: "Invalid image ID" };
      }

      const image = await DB.query(
        `SELECT * FROM IntroductionImages WHERE id = :id`,
        {
          id: imageId,
        }
      );

      if (image.length === 0) {
        throw { status: 404, message: "Image not found" };
      }

      if (req.file && req.file.buffer) {
        const form = new FormData();
        form.append("image", req.file.buffer, req.file.originalname); 
        form.append("key", IMGBB_API_KEY); 

        const response = await axios.post(
          "https://api.imgbb.com/1/upload",
          form,
          {
            headers: {
              ...form.getHeaders(),
            },
          }
        );

        const imageUrl = response.data.data.url;

        await DB.execute(
          `UPDATE IntroductionImages SET url = :url WHERE id = :id`,
          {
            url: imageUrl,
            id: imageId,
          }
        );
      }

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
        `SELECT id, url, isActive FROM IntroductionImages ORDER BY id DESC`
      );

      return res.status(200).json(images); // Directly return the images array with id, url, and isActive
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
        `SELECT id, url FROM IntroductionImages WHERE id = :id`,
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

  setActiveImage = async (req: ExtendedRequest, res: Response) => {
    try {
      const imageId = req.params.id;

      if (!isValidId(imageId)) {
        throw { status: 400, message: "Invalid image ID" };
      }

      const image = await DB.query(
        `SELECT * FROM IntroductionImages WHERE id = :id`,
        {
          id: imageId,
        }
      );

      if (image.length === 0) {
        throw { status: 404, message: "Image not found" };
      }

      await DB.execute(
        `UPDATE IntroductionImages SET isActive = :isActive WHERE id = :id`,
        {
          isActive: true,
          id: imageId,
        }
      );

      await DB.execute(
        `UPDATE IntroductionImages SET isActive = :isActive WHERE id != :id`,
        {
          isActive: false,
          id: imageId,
        }
      );

      return res.status(200).json({
        message: "Image set to active, others set to inactive",
      });
    } catch (e: any) {
      return res.status(e.status || 500).json({
        error: e.message || "Internal server error",
      });
    }
  };
}

export default ImageController;

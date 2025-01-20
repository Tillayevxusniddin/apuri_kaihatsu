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

const upload = multer({ storage: multer.memoryStorage() });

class MediaController implements IController {
  public router: Router = express.Router();

  constructor() {
    this.initRoutes();
    this.initTable();
  }

  private async initTable() {
    try {
      await DB.execute(`
        CREATE TABLE IF NOT EXISTS Media (
          id INT AUTO_INCREMENT PRIMARY KEY,
          imageUrl VARCHAR(255) NOT NULL,
          videoUrl VARCHAR(255) NOT NULL,
          title VARCHAR(100) NOT NULL,
          description TEXT NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("Media table verified/created successfully.");
    } catch (error) {
      console.error("Error ensuring Media table exists:", error);
    }
  }

  initRoutes(): void {
    this.router.post(
      "/media/create",
      verifyToken,
      upload.single("image"),
      this.createMedia
    );
    this.router.delete("/media/:id", verifyToken, this.deleteMedia);
    this.router.put(
      "/media/:id",
      verifyToken,
      upload.single("image"),
      this.updateMedia
    );
    this.router.get("/media/list", verifyToken, this.getMediaList);
    this.router.get("/media/:id", verifyToken, this.getMediaDetail);
  }

  // Create a new media entry
  createMedia = async (req: ExtendedRequest, res: Response) => {
    try {
      const { videoUrl, title, description } = req.body;

      if (!req.file || !req.file.buffer) {
        throw { status: 400, message: "No image file uploaded" };
      }

      if (!videoUrl || !title || !description) {
        throw { status: 400, message: "Missing required fields" };
      }

      // Upload image to imgBB
      const form = new FormData();
      form.append("image", req.file.buffer, req.file.originalname);
      form.append("key", IMGBB_API_KEY);

      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        form,
        {
          headers: { ...form.getHeaders() },
        }
      );

      const imageUrl = response.data.data.url;

      // Insert the new media entry into the database
      const result = await DB.execute(
        `INSERT INTO Media (imageUrl, videoUrl, title, description) VALUES (:imageUrl, :videoUrl, :title, :description)`,
        { imageUrl, videoUrl, title, description }
      );

      return res.status(201).json({
        message: "Media created successfully",
        media_id: result.insertId,
        imageUrl,
      });
    } catch (e: any) {
      return res
        .status(e.status || 500)
        .json({ error: e.message || "Internal server error" });
    }
  };

  // Delete media entry
  deleteMedia = async (req: ExtendedRequest, res: Response) => {
    try {
      const mediaId = req.params.id;

      if (!isValidId(mediaId)) {
        throw { status: 400, message: "Invalid media ID" };
      }

      const media = await DB.query(`SELECT * FROM Media WHERE id = :id`, {
        id: mediaId,
      });

      if (media.length === 0) {
        throw { status: 404, message: "Media not found" };
      }

      await DB.execute(`DELETE FROM Media WHERE id = :id`, { id: mediaId });

      return res.status(200).json({ message: "Media deleted successfully" });
    } catch (e: any) {
      return res
        .status(e.status || 500)
        .json({ error: e.message || "Internal server error" });
    }
  };

  // Update media entry
  updateMedia = async (req: ExtendedRequest, res: Response) => {
    try {
      const mediaId = req.params.id;
      const { videoUrl, title, description } = req.body;

      if (!isValidId(mediaId)) {
        throw { status: 400, message: "Invalid media ID" };
      }

      const media = await DB.query(`SELECT * FROM Media WHERE id = :id`, {
        id: mediaId,
      });

      if (media.length === 0) {
        throw { status: 404, message: "Media not found" };
      }

      let imageUrl = media[0].imageUrl;
      if (req.file && req.file.buffer) {
        const form = new FormData();
        form.append("image", req.file.buffer, req.file.originalname);
        form.append("key", IMGBB_API_KEY);

        const response = await axios.post(
          "https://api.imgbb.com/1/upload",
          form,
          {
            headers: { ...form.getHeaders() },
          }
        );

        imageUrl = response.data.data.url;
      }

      await DB.execute(
        `UPDATE Media SET imageUrl = :imageUrl, videoUrl = :videoUrl, title = :title, description = :description WHERE id = :id`,
        { imageUrl, videoUrl, title, description, id: mediaId }
      );

      return res.status(200).json({ message: "Media updated successfully" });
    } catch (e: any) {
      return res
        .status(e.status || 500)
        .json({ error: e.message || "Internal server error" });
    }
  };

  // Get list of media entries
  getMediaList = async (req: ExtendedRequest, res: Response) => {
    try {
      const mediaList = await DB.query(
        `SELECT id, imageUrl, videoUrl, title, description FROM Media ORDER BY id DESC`
      );

      return res.status(200).json(mediaList);
    } catch (e: any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  // Get media entry details
  getMediaDetail = async (req: ExtendedRequest, res: Response) => {
    try {
      const mediaId = req.params.id;

      if (!isValidId(mediaId)) {
        throw { status: 400, message: "Invalid media ID" };
      }

      const media = await DB.query(
        `SELECT id, imageUrl, videoUrl, title, description FROM Media WHERE id = :id`,
        { id: mediaId }
      );

      if (media.length === 0) {
        throw { status: 404, message: "Media not found" };
      }

      return res.status(200).json({ media: media[0] });
    } catch (e: any) {
      return res
        .status(e.status || 500)
        .json({ error: e.message || "Internal server error" });
    }
  };
}

export default MediaController;

import File from "../models/File.js";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "aetherdrive",
        resource_type: "auto",
      },
      async (error, result) => {
        if (error) {
          console.error(error);

          return res.status(500).json({
            success: false,
            message: "Cloudinary upload failed",
          });
        }

        try {
          const newFile = await File.create({
            name: req.file.originalname,
            originalName: req.file.originalname,
            owner: req.user._id,
            folder: req.body.folder || null,
            url: result.secure_url,
            publicId: result.public_id,
            mimeType: req.file.mimetype,
            size: req.file.size,
          });

          return res.status(201).json({
            success: true,
            message: "File uploaded successfully",
            file: newFile,
          });

        } catch (dbError) {
          console.error(dbError);

          return res.status(500).json({
            success: false,
            message: "Failed to save file metadata",
          });
        }
      }
    );

    streamifier
      .createReadStream(req.file.buffer)
      .pipe(uploadStream);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
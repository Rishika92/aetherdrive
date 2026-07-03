import File from "../models/File.js";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import Folder from "../models/Folder.js";
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
export const getFiles = async (req, res) => {
  try {
    const { folder } = req.query;

    const query = {
      owner: req.user._id,
      isDeleted: false,
    };

    if (folder) {
      query.folder = folder;
    } else {
      query.folder = null;
    }

    const files = await File.find(query)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: files.length,
      files,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findOne({
      _id: id,
      owner: req.user._id,
      isDeleted: false,
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(file.publicId, {
      resource_type: "auto",
    });

    // Soft delete in MongoDB
    file.isDeleted = true;
    await file.save();

    return res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const searchFiles = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

   const files = await File.find({
  owner: req.user._id,
  isDeleted: false,
  $or: [
    {
      name: {
        $regex: query,
        $options: "i",
      },
    },
    {
      originalName: {
        $regex: query,
        $options: "i",
      },
    },
  ],
}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: files.length,
      files,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getFileById = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findOne({
      _id: id,
      owner: req.user._id,
      isDeleted: false,
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    return res.status(200).json({
      success: true,
      file,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const renameFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "File name is required",
      });
    }

    const file = await File.findOne({
      _id: id,
      owner: req.user._id,
      isDeleted: false,
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    file.name = name;
    await file.save();

    res.status(200).json({
      success: true,
      message: "File renamed successfully",
      file,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const moveFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { folderId } = req.body;

    const file = await File.findOne({
      _id: id,
      owner: req.user._id,
      isDeleted: false,
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    // Verify destination folder exists
    if (folderId) {
      const folder = await Folder.findOne({
        _id: folderId,
        owner: req.user._id,
      });

      if (!folder) {
        return res.status(404).json({
          success: false,
          message: "Destination folder not found",
        });
      }
    }

    file.folder = folderId || null;

    await file.save();

    return res.status(200).json({
      success: true,
      message: "File moved successfully",
      file,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getTrashFiles = async (req, res) => {
  try {
    const files = await File.find({
      owner: req.user._id,
      isDeleted: true,
    }).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      count: files.length,
      files,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const restoreFile = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findOne({
      _id: id,
      owner: req.user._id,
      isDeleted: true,
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    file.isDeleted = false;
    await file.save();

    return res.status(200).json({
      success: true,
      message: "File restored successfully",
      file,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const permanentDeleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findOne({
      _id: id,
      owner: req.user._id,
      isDeleted: true,
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    await cloudinary.uploader.destroy(file.publicId, {
      resource_type: "auto",
    });

    await File.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "File permanently deleted",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};  
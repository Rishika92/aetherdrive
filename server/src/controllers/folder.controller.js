import Folder from "../models/Folder.js";

export const createFolder = async (req, res) => {
  try {
    const { name, parentFolder = null } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Folder name is required",
      });
    }

    // Check duplicate folder inside same parent
    const existingFolder = await Folder.findOne({
      name,
      owner: req.user._id,
      parentFolder,
    });

    if (existingFolder) {
      return res.status(409).json({
        success: false,
        message: "Folder already exists",
      });
    }

    const folder = await Folder.create({
      name,
      owner: req.user._id,
      parentFolder,
    });

    res.status(201).json({
      success: true,
      message: "Folder created successfully",
      folder,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
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
export const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({
      owner: req.user._id,
    }).lean();

    // Create a map for quick lookup
    const folderMap = {};

    folders.forEach((folder) => {
      folder.children = [];
      folderMap[folder._id.toString()] = folder;
    });

    const folderTree = [];

    folders.forEach((folder) => {
      if (folder.parentFolder) {
        const parent =
          folderMap[folder.parentFolder.toString()];

        if (parent) {
          parent.children.push(folder);
        }
      } else {
        folderTree.push(folder);
      }
    });

    return res.status(200).json({
      success: true,
      folders: folderTree,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const renameFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Folder name is required",
      });
    }

    const folder = await Folder.findOne({
      _id: id,
      owner: req.user._id,
    });

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found",
      });
    }

    // Prevent duplicate folder names in the same parent
    const duplicate = await Folder.findOne({
      owner: req.user._id,
      parentFolder: folder.parentFolder,
      name,
      _id: { $ne: folder._id },
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "A folder with this name already exists.",
      });
    }

    folder.name = name;

    await folder.save();

    return res.status(200).json({
      success: true,
      message: "Folder renamed successfully",
      folder,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;

    const folder = await Folder.findOne({
      _id: id,
      owner: req.user._id,
    });

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found",
      });
    }

    await Folder.deleteOne({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Folder deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
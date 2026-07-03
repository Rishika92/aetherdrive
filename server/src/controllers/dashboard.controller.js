import File from "../models/File.js";
import Folder from "../models/Folder.js";
import formatBytes from "../utils/formatBytes.js";
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalFiles = await File.countDocuments({
      owner: userId,
      isDeleted: false,
    });

    const totalFolders = await Folder.countDocuments({
      owner: userId,
    });

    const files = await File.find({
      owner: userId,
      isDeleted: false,
    });

    const storageUsed = files.reduce(
      (sum, file) => sum + file.size,
      0
    );

    res.status(200).json({
  success: true,
  stats: {
    totalFiles,
    totalFolders,
    storageUsed,
    storageUsedFormatted: formatBytes(storageUsed),
  },
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
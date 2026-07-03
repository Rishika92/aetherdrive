import express from "express";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { uploadFile ,getFiles,deleteFile,searchFiles,getFileById,renameFile,moveFile,getTrashFiles,
restoreFile,
permanentDeleteFile} from "../controllers/file.controller.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("file"),
  uploadFile
);
router.get("/", protect, getFiles);
router.delete("/:id", protect, deleteFile);
router.get("/search", protect, searchFiles);
router.get("/:id", protect, getFileById);
router.patch("/:id/rename", protect, renameFile);
router.patch("/:id/move", protect, moveFile);
router.get("/trash", protect, getTrashFiles);
router.patch("/:id/restore", protect, restoreFile);
router.delete("/:id/permanent", protect, permanentDeleteFile);
export default router;  
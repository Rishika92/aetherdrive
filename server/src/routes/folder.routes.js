import express from "express";
import protect from "../middleware/auth.middleware.js";
import { createFolder,getFolders, renameFolder,deleteFolder} from "../controllers/folder.controller.js";

const router = express.Router();

router.post("/", protect, createFolder);
router.get("/", protect, getFolders);
router.put("/:id", protect, renameFolder);
router.delete("/:id", protect, deleteFolder);
export default router;
import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    parentFolder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },

    path: {
      type: String,
      default: "/",
    },
  },
  {
    timestamps: true,
  }
);

const Folder = mongoose.model("Folder", folderSchema);

export default Folder;
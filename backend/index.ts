import express from "express";
import { exec } from "child_process";
import path from "path";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post("/", upload.single('image'), (req, res) => {
  if (!req.file) {
    console.error('No file uploaded');
    return res.status(400).json({ error: 'No file uploaded' });
  }

  console.log("Received file:", req.file);

  const inputPath = path.join(__dirname, '../uploads', req.file.filename);
  const outputPath = path.join(__dirname, '../uploads', `skeleton_${req.file.filename}`);

  exec(`python3 backend/skeletonize.py ${inputPath} ${outputPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return res.status(500).json({ error: 'Image processing failed' });
    }
    if (stderr) {
      console.error(`Python script stderr: ${stderr}`);
      return res.status(500).json({ error: 'Image processing failed' });
    }

    res.json({ skeletonImageUrl: `/uploads/skeleton_${req.file.filename}` });
  });
});

export default router;

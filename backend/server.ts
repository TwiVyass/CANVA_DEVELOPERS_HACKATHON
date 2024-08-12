import express from 'express';
import multer from 'multer';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/process-image', upload.single('image'), async (req, res) => {
  try {
    // Save the image temporarily
    const filePath = path.join(__dirname, 'temp_image.png');
    require('fs').writeFileSync(filePath, req.file.buffer);

    // Call the Python script
    const { stdout, stderr } = await execPromise(`python3 skeletonize.py ${filePath}`);
    
    if (stderr) {
      console.error('Error:', stderr);
      return res.status(500).send('Internal Server Error');
    }
    
    res.send(stdout);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

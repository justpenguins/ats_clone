const express = require('express');
const multer = require('multer');
const aws = require('aws-sdk');
const app = express();
const port = 5000;

// AWS S3 Setup
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload Resume API
app.post('/upload', upload.single('resume'), (req, res) => {
  const params = {
    Bucket: 'your-s3-bucket-name',
    Key: `resumes/${req.file.originalname}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error uploading file");
    }
    res.status(200).send("File uploaded successfully");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require('express');
const multer = require('multer');
const cors = require('cors');
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


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

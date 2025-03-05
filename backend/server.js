const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3131; // Changed port to 3131

app.use(cors());

// Ensure 'photos' directory exists
const photosDir = './photos';
if (!fs.existsSync(photosDir)) {
    fs.mkdirSync(photosDir);
    console.log(`Created directory: ${photosDir}`);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, photosDir);
    },
    filename: (req, file, cb) => {
        const patientId = req.body.patientId;
        const ext = path.extname(file.originalname);
        cb(null, `${patientId}-${Date.now()}${ext}`);
    }
});
const upload = multer({ storage });

const mockPatients = ['123', '456', '789'];

app.post('/upload', upload.single('photo'), (req, res) => {
    console.log('Request received at /upload');
    const patientId = req.body.patientId;

    if (!mockPatients.includes(patientId)) {
        console.log('Invalid patient ID:', patientId);
        return res.status(400).json({ message: 'Invalid patient ID' });
    }

    console.log('Photo uploaded successfully for patient:', patientId);
    res.send('Photo uploaded successfully'); // Modified to send plain text response
});

app.use((err, req, res, next) => {
    console.error('Backend error:', err);
    res.status(500).send('Internal server error'); // Modified to send plain text error response
});

console.log('Starting server...'); // Added startup log
app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});

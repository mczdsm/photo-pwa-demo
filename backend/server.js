const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up photo storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './photos/');
    },
    filename: (req, file, cb) => {
        const patientId = req.body.patientId;
        const ext = path.extname(file.originalname);
        cb(null, `${patientId}-${Date.now()}${ext}`);
    }
});
const upload = multer({ storage });

// Mock patient list (replace with EMR integration later)
const mockPatients = ['123', '456', '789'];

// Photo upload endpoint
app.post('/upload', upload.single('photo'), (req, res) => {
    const patientId = req.body.patientId;

    if (!mockPatients.includes(patientId)) {
        return res.status(400).json({ message: 'Invalid patient ID' });
    }

    res.json({ message: `Photo uploaded for patient ${patientId}` });
});

app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});

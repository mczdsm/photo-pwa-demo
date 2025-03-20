const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json()); // Add this line to parse JSON requests

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
const mockPatients = {
    '123': { dob: '1990-01-15' },
    '456': { dob: '1985-05-20' },
    '789': { dob: '2000-12-01' }
};

// Photo upload endpoint
app.post('/upload', upload.single('photo'), (req, res) => {
    const patientId = req.body.patientId;

    if (!mockPatients[patientId]) {
        return res.status(400).json({ message: 'Invalid patient ID' });
    }

    res.json({ message: `Photo uploaded for patient ${patientId}` });
});

// n8n webhook simulation for DOB retrieval
app.get('/verify', (req, res) => {
  const patientId = req.query.patientId;
    if (mockPatients[patientId]) {
        res.json({ dob: mockPatients[patientId].dob });
    } else {
        res.status(404).json({ message: 'Patient not found' });
    }
});

app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});

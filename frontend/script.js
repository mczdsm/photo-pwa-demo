async function uploadPhoto() {
    const patientId = document.getElementById('patientId').value;
    const photoInput = document.getElementById('photoInput');
    const status = document.getElementById('status');

    if (!patientId || !photoInput.files[0]) {
        status.textContent = 'Please provide a patient ID and photo.';
        return;
    }

    const formData = new FormData();
    formData.append('patientId', patientId);
    formData.append('photo', photoInput.files[0]);

    try {
        const response = await fetch('http://localhost:3000/upload', { // Modified URL to point to backend directly
            method: 'POST',
            body: formData
        });
        const result = await response.text(); // Changed from response.json() to response.text()
        status.textContent = result; // Directly use the text response
    } catch (error) {
        status.textContent = 'Error uploading photo: ' + error.message;
    }
}

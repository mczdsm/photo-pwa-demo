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
        // Use 'backend' service name to access backend from frontend in Docker
        const response = await fetch('http://backend:3131/upload', {
            method: 'POST', // Explicitly set method to POST
            body: formData
        });
        const result = await response.text();
        status.textContent = result;
    } catch (error) {
        status.textContent = 'Error uploading photo: ' + error.message;
    }
}

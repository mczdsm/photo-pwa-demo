let uploadedPhotoData = null;

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
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        status.textContent = result.message;

        // Store photo data for later use
        const reader = new FileReader();
        reader.onloadend = () => {
          uploadedPhotoData = reader.result;
          document.getElementById('step1').style.display = 'none';
          document.getElementById('step2').style.display = 'block';
          document.getElementById('patientIdVerify').value = patientId; // Pre-fill patient ID
        }
        reader.readAsDataURL(photoInput.files[0]);

    } catch (error) {
        status.textContent = 'Error uploading photo: ' + error.message;
    }
}

async function verifyPatient() {
    const patientId = document.getElementById('patientIdVerify').value;
    const status = document.getElementById('status');

    if (!patientId) {
        status.textContent = 'Please enter the patient ID.';
        return;
    }

  // Simulate n8n webhook call for DOB retrieval
    try {
      const response = await fetch(`http://localhost:3000/verify?patientId=${patientId}`);
      const data = await response.json();

      if (data.dob) {
          document.getElementById('displayPatientId').textContent = patientId;
          document.getElementById('displayPatientDOB').textContent = data.dob;
          document.getElementById('uploadedPhoto').src = uploadedPhotoData;
          document.getElementById('step2').style.display = 'none';
          document.getElementById('step3').style.display = 'block';
      } else {
          status.textContent = 'Patient not found or DOB unavailable.';
      }

    } catch (error) {
      status.textContent = "Error verifying patient " + error
    }
}

function confirmDOB() {
    const status = document.getElementById('status');
    // In a real application, this would send the data to the EMR.
    status.textContent = 'Data sent to EMR (simulated).';
    // Reset the form
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
    document.getElementById('patientId').value = '';
    document.getElementById('photoInput').value = '';
    uploadedPhotoData = null;
}

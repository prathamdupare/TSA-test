const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Write your content here...',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // Formatting buttons
        [{ list: 'ordered' }, { list: 'bullet' }], // List buttons
        ['link'], // Link and image buttons
      ],
    },
});

function activateLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'flex'; // Display the loader
}

// Hide loader
function deactivateLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'none'; // Hide the loader
}

const selectImageButton = document.getElementById('selectImageButton');
const editImageInput = document.getElementById('editImage');
const selectedImageName = document.getElementById('selectedImageName');
const imagePreview = document.getElementById('imagePreview');

selectImageButton.addEventListener('click', () => {
  editImageInput.click();
});

function updateImagePreview() {
  const file = editImageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imagePreview.classList.remove('hidden'); // Show the image preview
    };
    reader.readAsDataURL(file);
    selectedImageName.textContent = file.name;
  } else {
    imagePreview.src = '';
    imagePreview.classList.add('hidden'); // Hide the image preview
    selectedImageName.textContent = 'No image selected';
  }
}

const Types = {
    INDIVIDUAL: 'Individual',
    COUPLE: 'Couple',
  };
// Get the dropdown element
const categorySelect = document.getElementById('editCategory');

// Populate the dropdown
Object.entries(Types).forEach(([key, value]) => {
  const option = document.createElement('option');
  option.value = value; // Use the enum key as the value
  option.textContent = value; // Display the readable value
  categorySelect.appendChild(option);
});



let sessionId, sessionName, sessionType, sessionPrice, sessionSelfHelpCredit, sessionSessions, sessionDescription;





  
function showEditModal(session) {
  // Populate the form with session data
  
  const apiUrl = 'https://tsa-backend.fosspage.tech'
  


  sessionId = session._id
  sessionName = session.name;
  sessionType = session.type
  sessionPrice = session.price
  sessionSelfHelpCredit = session.selfHelpCredit
  sessionSessions = session.sessions
  sessionDescription = session.description
 
  document.getElementById('sessionId').value = session._id;
  document.getElementById('editTitle').value = session.name;
  document.getElementById('editCategory').value = session.type || '';
  document.getElementById('editPrice').value = session.price;
 
  document.getElementById('editSelfHelpCredits').value = session.selfHelpCredit;
  document.getElementById('editSessions').value = session.sessions;
  
  document.getElementById('imagePreview').src = `${apiUrl}/${session.Image}`;
  imagePreview.classList.remove('hidden');

  quill.root.innerHTML = session.description || '';

  // Show the modal
  document.getElementById('editSessionModal').classList.remove('hidden');
}

function closeEditModal() {
  document.getElementById('editSessionModal').classList.add('hidden');
} 

// Handle form submission
document.getElementById('editSessionForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    activateLoader();
  
    const currentSessionId = document.getElementById('sessionId').value;
    const currentSessionName = document.getElementById('editTitle').value;
    const currentSessionType = document.getElementById('editCategory').value;
    const currentSessionPrice = document.getElementById('editPrice').value;
    const currentSessionSelfHelpCredit = document.getElementById('editSelfHelpCredits').value;
    const currentSessionSessions = document.getElementById('editSessions').value;
    const currentSessionDescription = quill.root.innerHTML.trim();


    
  
    // Check if any values have changed
    const hasChanged = 
      sessionName != currentSessionName ||
      sessionType != currentSessionType ||
      sessionPrice != currentSessionPrice ||
      sessionSelfHelpCredit != currentSessionSelfHelpCredit ||
      sessionSessions != currentSessionSessions ||
      sessionDescription.trim() !== currentSessionDescription;
  
    if (!hasChanged) {
      alert('No changes detected.');
      deactivateLoader();
      return;
    }
  
    // Create a FormData object to handle both text and file data
    const formData = new FormData();
    formData.append('title', currentSessionName);
    formData.append('type', currentSessionType);
    formData.append('id', sessionId);
    formData.append('price', currentSessionPrice);
    formData.append('selfHelpCredits', currentSessionSelfHelpCredit);
    formData.append('sessions', currentSessionSessions);
    formData.append('content', currentSessionDescription);
  
    const editImageInput = document.getElementById('editImage');
  
    // Log form data
   
  
    if (editImageInput.files.length > 0) {
      formData.append('image', editImageInput.files[0]); // Append image if selected
    }
  
    // Confirm update
    if (confirm('Are you sure you want to update this session?')) {
      try {
        const response = await fetch(`${apiUrl}/api/session/${sessionId}`, {
          method: 'PUT',
          body: formData, // Send the FormData object
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}` // No 'Content-Type' here
          },
        });
  
        if (response.ok) {
          alert('Session updated successfully!');
          location.reload(); // Reload the page to reflect changes
        } else {
          const error = await response.json();
          deactivateLoader();
          alert(`Failed to update session: ${error.message}`);
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred while updating the session.');
      }
    }else{
        deactivateLoader();
    }
  });


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

const categories = {
    DONATIONS: 'Donations',
    EDUCATIONS: 'Educations',
    FUNDRAISING: 'Fundraising',
    FOODS: 'Foods',
    MEDICAL_HELP: 'Medical Help',
    WATER_SUPPORT: 'Water Support',
  };
// Get the dropdown element
const categorySelect = document.getElementById('editCategory');

// Populate the dropdown
Object.entries(categories).forEach(([key, value]) => {
  const option = document.createElement('option');
  option.value = value; // Use the enum key as the value
  option.textContent = value; // Display the readable value
  categorySelect.appendChild(option);
});
  
  function showEditModal(blog) {
    // Populate the form with blog data
    
    const apiUrl = 'https://tsa-backend-thuu.onrender.com'
   
  
    document.getElementById('blogId').value = blog._id;
    document.getElementById('editTitle').value = blog.title;
    document.getElementById('editCategory').value = blog.category || '';
    
    document.getElementById('imagePreview').src = `${apiUrl}/uploads/${blog.Img}`;
    imagePreview.classList.remove('hidden');

    quill.root.innerHTML = blog.content || '';
  
    // Show the modal
    document.getElementById('editBlogModal').classList.remove('hidden');
  }
  
  function closeEditModal() {
    document.getElementById('editBlogModal').classList.add('hidden');
  } 
//   // Handle form submission
document.getElementById('editBlogForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  activateLoader()

  const blogId = document.getElementById('blogId').value;
  
  

  // Create a FormData object to handle both text and file data
  
  const formData = new FormData();
  formData.append('title', document.getElementById('editTitle').value);
  formData.append('category', document.getElementById('editCategory').value);
  formData.append('content', quill.root.innerHTML); // Quill's content as HTML
  const editImageInput = document.getElementById('editImage');
  
  if (editImageInput.files.length > 0) {
    formData.append('image', editImageInput.files[0]); // Append image if selected
  }
  

  // Confirm update
  if (confirm('Are you sure you want to update this blog?')) {
    try {
      const response = await fetch(`${apiUrl}/api/blogs/${blogId}`, {
        method: 'PUT',
        body: formData, // Send the FormData object
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}` // No 'Content-Type' here
        },
      });

      if (response.ok) {
        alert('Blog updated successfully!');
        location.reload(); // Reload the page to reflect changes
      } else {
        const error = await response.json();
        deactivateLoader()
        alert(`Failed to update blog: ${error.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while updating the blog.');
    }
  }
});

  
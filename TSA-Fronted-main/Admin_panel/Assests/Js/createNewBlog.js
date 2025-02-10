

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


  


  const form = document.getElementById('blogForm');
  const previewButton = document.getElementById('previewButton');
  const submitButton = document.getElementById('submitButton');
  const previewSection = document.getElementById('previewSection');
  const previewContent = document.getElementById('previewContent');
  const message = document.getElementById('message');

  // Function to handle preview
 // Function to handle preview
previewButton.addEventListener('click', () => {
    const title = document.getElementById('title').value;
  const Img = document.getElementById('Img').files[0];
  const category = document.getElementById('category').value
    const content = quill.root.innerHTML; // Get the HTML content from the editor
  
    if (!title || !Img || content === '<p><br></p>') {
      message.textContent = 'Please fill in all fields before previewing.';
      message.classList.add('text-red-500');
      return;
    }
  
    message.textContent = ''; // Clear message
  
    // Create image preview
 
    const reader = new FileReader();
    reader.onload = () => {
      previewContent.innerHTML = `
        <h3 class="text-xl font-bold mb-2">${title}</h3>
        
        <p class="mb-4">Category:</p>
        <div class="border border-gray-300 p-4 rounded-md">${category}</div>
        <p class="mb-4">Content:</p>
        <div class="border border-gray-300 p-4 rounded-md">${content}</div>
        <img src="${reader.result}" alt="Uploaded Image" class="mt-4 max-w-full rounded-md shadow-md" />
      `;
      previewSection.classList.remove('hidden');
      submitButton.style.display = 'block';
    };
    reader.readAsDataURL(Img); // Convert image to Base64 for preview
  });
  

  // Function to handle form submission
  submitButton.addEventListener('click', async () => {
    const title = document.getElementById('title').value;
    const Img = document.getElementById('Img').files[0];
    const category = document.getElementById('category').value
    const content = quill.root.innerHTML;
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('image', Img);
  
    const apiUrl = 'https://tsa-backend-thuu.onrender.com';
  
    try {
      // Debugging: Log FormData entries
     

      activateLoader()
  
      const response = await fetch(`${apiUrl}/api/blogs`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}` // No 'Content-Type' here
        },
      });
  
      if (response.ok) {
        message.textContent = 'Blog created successfully!';
        message.classList.add('text-green-500');
        form.reset();
        quill.setContents([]);
        previewSection.classList.add('hidden');
          submitButton.style.display = 'none';
          alert('Blog created successfully!')
        window.location.href = 'blog.html'
        deactivateLoader()
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData}`);
        message.textContent = `Failed to create blog: ${errorData || 'Unknown error'}`;
        message.classList.add('text-red-500');
        deactivateLoader()
      }
    } catch (error) {
       
        
      alert(`Error: ${error.message}`);
    }
  });
  

  // Backend enum passed to the frontend
  const categories = {
    DONATIONS: 'Donations',
    EDUCATIONS: 'Educations',
    FUNDRAISING: 'Fundraising',
    FOODS: 'Foods',
    MEDICAL_HELP: 'Medical Help',
    WATER_SUPPORT: 'Water Support',
  };
// Get the dropdown element
const categorySelect = document.getElementById('category');

// Populate the dropdown
Object.entries(categories).forEach(([key, value]) => {
  const option = document.createElement('option');
  option.value = value; // Use the enum key as the value
  option.textContent = value; // Display the readable value
  categorySelect.appendChild(option);
});
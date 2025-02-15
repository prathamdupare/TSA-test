const quill = new Quill('#description', {
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
previewButton.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const Img = document.getElementById('Img').files[0];
    const type = document.getElementById('type').value;
    const content = quill.root.innerHTML;

    const price = document.getElementById('price').value;
    const selfHelpCredit = document.getElementById('selfHelpCredit').value;
    const sessions = document.getElementById('sessions').value;

    if (!name || !Img || content === '<p><br></p>') {
      message.textContent = 'Please fill in all fields before previewing.';
      message.classList.add('text-red-500');
      return;
    }

    message.textContent = '';

    const reader = new FileReader();
    reader.onload = () => {
      previewContent.innerHTML = `
        <h3 class="text-xl font-bold mb-2">${name}</h3>
        <p class="mb-4">Type:</p>
        <div class="border border-gray-300 p-4 rounded-md">${type}</div>
        <p class="mb-4">Content:</p>
        <div class="border border-gray-300 p-4 rounded-md">${content}</div>
        <p class="mb-4">Price:</p>
        <div class="border border-gray-300 p-4 rounded-md">${price}</div>
        <p class="mb-4">Self Help Credit:</p>
        <div class="border border-gray-300 p-4 rounded-md">${selfHelpCredit}</div>
        <p class="mb-4">Sessions:</p>
        <div class="border border-gray-300 p-4 rounded-md">${sessions}</div>
        <img src="${reader.result}" alt="Uploaded Image" class="mt-4 max-w-full rounded-md shadow-md" />
      `;
      previewSection.classList.remove('hidden');
      submitButton.style.display = 'block';
    };
    reader.readAsDataURL(Img);
});

// Function to handle form submission
submitButton.addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const Img = document.getElementById('Img').files[0];
    const type = document.getElementById('type').value;
    const content = quill.root.innerHTML;
    const price = document.getElementById('price').value;
    const selfHelpCredit = document.getElementById('selfHelpCredit').value;
    const sessions = document.getElementById('sessions').value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', content);
    formData.append('type', type);
    formData.append('image', Img);
    formData.append('price', price);
    formData.append('selfHelpCredit', selfHelpCredit);
    formData.append('sessions', sessions);
    

    const apiUrl = 'https://tsa-backend.fosspage.tech';

    try {
      
    
      activateLoader();

      const response = await fetch(`${apiUrl}/api/session`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}` // No 'Content-Type' here
        },
      });

      if (response.ok) {
        message.textContent = 'Session created successfully!';
        message.classList.add('text-green-500');
        form.reset();
        quill.setContents([]);
        previewSection.classList.add('hidden');
        submitButton.style.display = 'none';
        alert('Session created successfully!');
        window.location.href = 'Session.html';
        deactivateLoader();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData}`);
        message.textContent = `Failed to create session: ${errorData || 'Unknown error'}`;
        message.classList.add('text-red-500');
        deactivateLoader();
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
});

// Backend enum passed to the frontend
const types = {
    INDIVIDUAL: 'Individual',
    COUPLE: 'Couple',
};
// Get the dropdown element
const typeSelect = document.getElementById('type');

// Populate the dropdown
Object.entries(types).forEach(([key, value]) => {
  const option = document.createElement('option');
  option.value = value; // Use the enum key as the value
  option.textContent = value; // Display the readable value
  typeSelect.appendChild(option);
});
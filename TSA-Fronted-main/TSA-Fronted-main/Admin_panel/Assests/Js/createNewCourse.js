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

function deactivateLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'none'; // Hide the loader
}

const form = document.getElementById('courseForm');
const previewButton = document.getElementById('previewButton');
const submitButton = document.getElementById('submitButton');
const previewSection = document.getElementById('previewSection');
const previewContent = document.getElementById('previewContent');
const message = document.getElementById('message');

previewButton.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const Img = document.getElementById('Img').files[0];
    const content = quill.root.innerHTML;
    const price = document.getElementById('price').value;
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
        <p class="mb-4">Content:</p>
        <div class="border border-gray-300 p-4 rounded-md">${content}</div>
        <p class="mb-4">Price:</p>
        <div class="border border-gray-300 p-4 rounded-md">${price}</div>
        <p class="mb-4">Sessions:</p>
        <div class="border border-gray-300 p-4 rounded-md">${sessions}</div>
        <img src="${reader.result}" alt="Uploaded Image" class="mt-4 max-w-full rounded-md shadow-md" />
      `;
      previewSection.classList.remove('hidden');
      submitButton.style.display = 'block';
    };
    reader.readAsDataURL(Img);
});

submitButton.addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const Img = document.getElementById('Img').files[0];
    const content = quill.root.innerHTML;
    const price = document.getElementById('price').value;
    const sessions = document.getElementById('sessions').value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', content);
    formData.append('image', Img);
    formData.append('price', price);
    formData.append('sessions', sessions);

    

    // Print form data
   

    const apiUrl = 'https://tsa-backend.fosspage.tech';

    try {
      activateLoader();

      const response = await fetch(`${apiUrl}/api/course`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
        },
      });

      if (response.ok) {
        message.textContent = 'Course created successfully!';
        message.classList.add('text-green-500');
        form.reset();
        quill.setContents([]);
        previewSection.classList.add('hidden');
        submitButton.style.display = 'none';
        alert('Course created successfully!');
        window.location.href = 'Courses.html';
        deactivateLoader();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData}`);
        message.textContent = `Failed to create course: ${errorData || 'Unknown error'}`;
        message.classList.add('text-red-500');
        deactivateLoader();
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
});
// API URL
const apiUrl = 'https://tsa-backend.fosspage.tech'; // Replace with your API endpoint

// Container to hold blog cards
const blogContainer = document.getElementById('blog-container');
var blogsArr = null;


function activateLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'flex'; // Display the loader
}

// Hide loader
function deactivateLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'none'; // Hide the loader
}


// Fetch blogs from API
async function fetchBlogs() {
  activateLoader()
  try {
    const response = await fetch(`${apiUrl}/api/blogs`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }

    const blogs = await response.json(); // Assuming the response is in JSON format
    blogsArr = blogs;
    renderBlogs(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    blogContainer.innerHTML = '<p class="text-red-500">Failed to load blogs.</p>';
  } finally {
    deactivateLoader()
  }
}








// Render blogs dynamically
function renderBlogs(blogs) {
  blogs.forEach(blog => {
    

    const blogCard = `
        <div class="w-full sm:w-[300px] max-h-[365px] ">
    <div class="bg-white border border-gray-200 max-h-[365px]  rounded-lg shadow hover:shadow-lg">
      <!-- Blog Image -->
      <img 
        class="w-full h-48 object-cover rounded-t-lg" 
        src="${apiUrl}/${blog.Img.replace(/\\/g, '/')}"
        alt="Blog Thumbnail" 
      />
      <!-- Blog Content -->
      <div class="p-5">
        <!-- Title -->
        <h2 class="text-xl font-semibold text-gray-800 truncate">${blog.title}</h2>
        <!-- Category -->
        <p class="mt-2 text-gray-500 flex items-center">
          <span class="font-bold text-gray-500 mr-1">Category: </span> ${blog?.category || "Not specified"}
        </p>
        <!-- Description -->
        <p class="mt-2 text-gray-500 flex items-center">
          <span class="font-bold text-gray-500 mr-1">Description: </span> <span class="flex">${`${blog.content.slice(0, 50)}`}</span>
        </p>
        <!-- Date -->
        <div class="mt-2 flex items-center justify-between text-sm">
          <span class="text-gray-500">Date: ${new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        <!-- Action Buttons -->
        <div class="mt-4 flex items-center justify-between">
          <button class="px-6 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600" onclick="showEditModal({ _id: '${blog._id}', title: '${blog.title}', category: '${blog.category}', content: '${blog.content}', Img: '${blog.Img.slice(8)}'  })" >Edit</button>
          <button 
            onclick="showDeleteModal({ id: '${blog._id}', name: '${blog.title}' })" 
            class="px-6 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
 


    `;
    blogContainer.innerHTML += blogCard; // Append the blog card
  });
}

// Call the function to fetch and render blogs
fetchBlogs();


// deleteFuctinality

// Elements for modal and buttons
const deleteModal = document.getElementById('deleteModal');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');

let blogToDelete = null;

function showDeleteModal(blog) {
  blogToDelete = blog; // Store blog info (e.g., { id, name })
  
  
  modalTitle.textContent = 'Confirm Deletion';
  modalContent.textContent = `Are you sure you want to delete the blog "${blog.name}"?`;
  deleteModal.classList.remove('hidden');
}

function hideDeleteModal() {
  blogToDelete = null;
  deleteModal.classList.add('hidden');
}

async function deleteBlog(blog) {
  try {

    const response = await fetch(`${apiUrl}/api/blogs/${blog.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      body: JSON.stringify(blog), // Sending blog details in the body
    });
    if (response.ok) {
      alert(`Blog "${blog.name}" deleted successfully.`);
      window.location.reload()
    } else {

      alert('Failed to delete the blog.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while deleting the blog.');
  }
}

confirmButton.addEventListener('click', () => {
  if (blogToDelete) deleteBlog(blogToDelete);
});
cancelButton.addEventListener('click', hideDeleteModal);


const searchModal = document.getElementById("searchModal");
const closeModal = document.getElementById("closeModal");
const searchInput = document.getElementById("searchInput");
const blogList = document.getElementById("blogList");

const displayBlogs = (blogsToShow) => {
  blogList.innerHTML = ""; // Clear previous results

  blogsToShow.forEach((blog) => {

    const li = document.createElement("li");
    li.className = "flex items-center p-4 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer";
    li.onclick = ()=> showEditModal({ _id: blog._id, title: blog.title, category: blog.category, Img: blog.Img.slice(8),  content: blog.content })

    // Create and append the image
    const img = document.createElement("img");
    img.src = `${apiUrl}/${blog.Img}`;
    img.alt = blog.title;
    img.className = "w-8 h-8 rounded-full mr-4"; // Tailwind classes for styling the icon
    li.appendChild(img);

    // Add blog title
    const title = document.createElement("span");
    title.textContent = blog.title;
    li.appendChild(title);

    blogList.appendChild(li);
  });
};

const searchClick = async () => {
  searchModal.classList.remove("hidden");


  displayBlogs(blogsArr.slice(0, 5)); // Display all blogs initially
}

closeModal.addEventListener("click", () => {
  searchModal.classList.add("hidden");
});

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filteredBlogs = blogsArr.filter((blog) =>
    blog.title.toLowerCase().includes(query)
  );
  displayBlogs(filteredBlogs); // Display filtered blogs
});









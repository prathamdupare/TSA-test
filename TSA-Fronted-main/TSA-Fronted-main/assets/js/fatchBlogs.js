// API URL
const apiUrl = 'https://tsa-backend.fosspage.tech'; // Replace with your API endpoint

// Container to hold blog cards
const blogContainer = document.getElementById('blog-container');
var blogsArr = null;


// Fetch blogs from API
async function fetchBlogs() {
  try {
    const response = await fetch(`${apiUrl}/api/blogs`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }

    const blogs = await response.json(); // Assuming the response is in JSON format
      
      
      renderBlogs(blogs);
      renderRecentBlogs(blogs);
    
    
  } catch (error) {
    console.error('Error fetching blogs:', error);
    blogContainer.innerHTML = '<p class="text-red-500">Failed to load blogs.</p>';
  }
}

function renderBlogs(blogs) {
    const allBlogsContainer = document.getElementById("allBlogs");
  allBlogsContainer.innerHTML = ""; // Clear existing content
   
  
    blogs.forEach((blog) => {
      // Blog Card HTML
      const blogCard = `
        <div class="th-blog blog-single has-post-thumbnail">
          <!-- Blog Images Slider -->
          <div class="blog-img th-slider" data-slider-options='{"effect":"fade"}'>
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <a>
                  <img loading="lazy" src="${apiUrl}/${blog.Img}" class="max-h-[50vh] w-full" alt="Blog Image">
                </a>
              </div>
            </div>
            
          </div>
  
          <!-- Blog Content -->
          <div class="blog-content">
            <div class="blog-meta">
              <a ><i class="fas fa-calendar-days"></i>${new Date(blog.createdAt).toLocaleDateString()}</a>
              <a ><i class="fas fa-tags"></i>${blog.category || "Uncategorized"}</a>
            </div>
            <h2 class="blog-title">
              ${blog.title}
            </h2>
            <p class="blog-text">
              ${blog.content.slice(0, 100)}${blog.content.length > 100 ? "..." : ""}
            </p>
            <button  class="th-btn btn-sm" onClick="openBlogDetailsModal({title : '${blog.title}', category: '${blog.category}', createdAt : '${blog.createdAt}', Img: '${blog.Img.slice(8)}', content : '${blog.content}'})">
              Read More <i class="fas fa-arrow-up-right ms-2"></i>
            </button>
          </div>
        </div>
      `;
  
      // Append the blog card to the container
      allBlogsContainer.innerHTML += blogCard;
    });
}
function renderRecentBlogs(blogs) {
    const recentBlogsContainer = document.getElementById("recentBlogs"); // Ensure the container ID matches your HTML
    recentBlogsContainer.innerHTML = ""; // Clear existing content
    blogsArr = blogs;
    // Sort blogs by date (newest first) and take the top 3
    const recentBlogs = blogs
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  
    // Loop through the top 3 blogs and generate the recent card HTML
    recentBlogs.forEach((blog) => {
      const recentCard = `
        <div class="recent-post" onClick="openBlogDetailsModal({title : '${blog.title}', category: '${blog.category}', createdAt : '${blog.createdAt}', Img: '${blog.Img.slice(8)}', content : '${blog.content}'})">
          <div class="media-img">
            <a>
              <img src="${apiUrl}/${blog.Img}" class="max-h-[85px] min-h-[85px]" alt="Blog Image">
            </a>
          </div>
          <div class="media-body">
            <div class="recent-post-meta">
              <a href="blog.html">
                <i class="fas fa-calendar-days"></i>${new Date(blog.createdAt).toLocaleDateString()}
              </a>
            </div>
            <h4 class="post-title">
              <a class="text-inherit" href="blog-details.html">${blog.title}</a>
            </h4>
          </div>
        </div>
      `;
  
      // Append the recent blog card to the container
      recentBlogsContainer.innerHTML += recentCard;
    });
  }
  
  

fetchBlogs();




function openBlogDetailsModal(blog) {
    
    // Populate modal with blog data
    document.getElementById("modalTitle1").textContent = blog.title;
    document.getElementById("modalTitle2").textContent = blog.title;
    document.getElementById("modalCategory").textContent = blog.category || "Not specified";
    document.getElementById("modalDate").textContent = new Date(blog.createdAt).toLocaleDateString();
    document.getElementById("modalImage").src = `${apiUrl}/uploads/${blog.Img}`;
    document.getElementById("modalContent").innerHTML = blog.content;
  
    // Show the modal
    document.getElementById("blogDetailsModal").classList.remove("hidden");
  
    // Stop scrolling
    document.body.style.overflow = "hidden";
  }
  
  function closeBlogDetailsModal() {
    // Hide the modal
    document.getElementById("blogDetailsModal").classList.add("hidden");
  
    // Restore scrolling
    document.body.style.overflow = "auto";
}

// Function to display the modal with blogs of a specific category
function showCategoryBlogsModal(category) {
  const modal = document.getElementById("categoryBlogsModal");
  const modalTitle = document.getElementById("modalCategoryTitle");
  const modalContent = document.getElementById("modalBlogsContent");
  document.body.style.overflow = "hidden";

  // Set modal title
  modalTitle.textContent = `Blogs for Category: ${category}`;

  // Filter blogs based on the category
  const filteredBlogs = blogsArr.filter((blog) => blog.category === category);

  // Render filtered blogs in the modal
  modalContent.innerHTML = ""; // Clear previous content
  if (filteredBlogs.length === 0) {
    modalContent.innerHTML = `<p class="text-gray-500">No blogs available for this category.</p>`;
  } else {
    filteredBlogs.forEach((blog) => {
      let ImgUrl = `${apiUrl}/${blog.Img}`
      
      const blogCard = `

        <div class="border rounded-lg p-4 mb-4 flex">
        <div class="mr-4"><img src=${ImgUrl} class='w-[70px] md:w-[100px]'><img></div>
        <div>
          <h3 class="text-lg font-semibold">${blog.title}</h3>
          <p class="text-sm text-gray-500">${new Date(blog.createdAt).toLocaleDateString()}</p>
          <p>${blog.content.slice(0, 100)}...</p>
          <button class="text-blue-500 hover:underline mt-2" onclick="openBlogDetailsModal({title: '${blog.title}', category: '${blog.category}', createdAt: '${blog.createdAt}', Img: '${blog.Img.slice(8)}', content: '${blog.content}'})">
            Read More
          </button></div>
        </div>
      `;
      modalContent.innerHTML += blogCard;
    });
  }

  // Show the modal
  modal.classList.remove("hidden");
}

// Function to close the modal
function closeCategoryBlogsModal() {
  const modal = document.getElementById("categoryBlogsModal");
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

// Add event listeners to category buttons
document.querySelectorAll("li[data-category]").forEach((li) => {
  li.addEventListener("click", () => {
    const category = li.getAttribute("data-category");
    showCategoryBlogsModal(category);
  });
});


// Search functionality
const searchInput = document.getElementById("searchBox");

// Function to filter blogs based on search input
function filterBlogsByKeyword() {
  const keyword = searchInput.value.trim().toLowerCase(); // Trim whitespaces and convert to lowercase
  

  // If no keyword, render all blogs
  if (keyword === "") {
    renderBlogs(blogsArr);
    return;
  }

  // Filter blogs based on title containing the keyword
  const filteredBlogs = blogsArr.filter((blog) => 
    blog.title.toLowerCase().includes(keyword)
  );
  

  // Render the filtered blogs
  renderBlogs(filteredBlogs);

 
}

// Attach an event listener to the search input field
searchInput.addEventListener("input", filterBlogsByKeyword);

  


  

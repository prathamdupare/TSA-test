

// var Coursesdata = [

// ]

async function fetchCourses() {
    const apiUrl = 'https://tsa-backend.fosspage.tech'; // Replace with your API endpoint
    try {
        const response = await fetch(`${apiUrl}/api/course`);
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        const courses = await response.json(); // Assuming the response is in JSON format
       
        renderCourses(courses.courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}
fetchCourses()

function renderCourses(courses) {
    const courseCardContainer = document.getElementById("course-card-container");
    courseCardContainer.innerHTML = ""; // Clear existing content

    courses.forEach((course, index) => {
        const courseCard = createCard(course, index);
        courseCardContainer.innerHTML += courseCard;
    });
}

// Call the fetchCourses function to load courses
fetchCourses();



function createCard(session,i) {
    const buttonColors = ["bg-yellow-500", "bg-[#87b1fa]", "bg-green-700"];
    const hoverbuttonColors = ["bg-yellow-600", "bg-[#6496ed]", "bg-green-900"];
    const buttonColor = buttonColors[i % buttonColors.length];
    const hoverbuttonColor = hoverbuttonColors[i % buttonColors.length];
  
    return `
    
      <div class="relative min-h-full  shadow-md rounded-lg overflow-hidden border border-gray-200">
  <!-- Image Section -->
  <div class="relative">
    <img src="${`https://tsa-backend.fosspage.tech/${session.image}`}" alt="${session.name}" class="w-full  min-h-[20vh] max-h-[20vh] object-cover" loading="lazy">
    <div class="absolute top-0 bg-gray-500 bg-opacity-30 h-full w-full"></div>
  </div>

  <!-- Content Section -->
  <div class="pt-3 ">
    <!-- Title -->
    <h3 class="text-center text-2xl font-bold border-b-2  text-[#18ced6] pb-2 mb-3">${session.name.toUpperCase()}</h3>

    <!-- Sessions -->
    <p class="text-center text-xl  font-extrabold text-black ">
      ${session.sessions} SESSION${session.sessions > 1 ? "S" : ""}
    </p>

    <!-- Price -->
    <div class="text-center">
    <span class="text-center border-b-2 px-10 py-2 text-teal-600 text-lg font-bold ">
      ₹${session.price} <span class="text-sm font-normal text-gray-600">per session</span>
    </span></div>

    <!-- Description -->
    <div class="flex justify-center">
    <span class="text-center border-b-2 py-2 font-bold text-sm w-1/2 text-gray-500 mt-2 leading-relaxed">
      ${session.description}
    </span></div>

    <!-- Self-Help Credit (if applicable) -->
   

    <!-- Final Price -->
    <p class="text-center text-teal-700 font-bold text-xl mt-6">₹${session.price}</p>

    <!-- Button -->
    <div class='min-h-[70px]'></div>
    <button class="w-full absolute bottom-0 mt-4 py-3 ${buttonColor} hover:${hoverbuttonColor} text-white text-sm font-bold rounded-b-lg" onclick='openCourseModel(${JSON.stringify(session)})'>
      Book course
    </button>
  </div>
</div>
    `;
  }

  // Function to render cards based on type
  function renderCourseCards(sessions, type) {
    const cardContainer = document.getElementById("course-card-container");
    
    
    cardContainer.innerHTML = ""; // Clear existing cards
    // const filteredSessions = type ? sessions.filter(session => session?.type === type) : sessions;
    sessions.forEach((session,index) => {
      cardContainer.innerHTML += createCard(session,index);
    });
  }

  


// renderCourseCards(Coursesdata)

const courseModel = document.getElementById("courseModel");
const closeCourseModalButton = document.getElementById("closeCourseModal");
const courseHeading = document.getElementById("courseHeading");
const courseImage = document.getElementById("courseImage");
const courseDescription = document.getElementById("courseDescription");
const enrollButton = document.getElementById("enrollButton");
const courseSession = document.getElementById("sessionInfo")
const coursePrice = document.getElementById("priceInfo")

const openCourseModel = (course) => {
  courseModel.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  courseHeading.textContent = course.name;
  courseImage.src = `https://tsa-backend.fosspage.tech/${course.image}`; // Assuming course object has an image property
  courseDescription.innerHTML = `${course.description}`; // Assuming course object has a description property
  enrollButton.textContent = `Enroll for ₹${course.price}`; // Assuming course object has a price property
  
  // Update the session and price information in the modal
  courseSession.textContent = `${course.sessions} Sessions`; // Assuming course object has a sessions property
  coursePrice.textContent = `Price: ₹${course.price}`; // Assuming course object has a price property
}

closeCourseModalButton.addEventListener("click", () => {
  courseModel.classList.add("hidden");
  enrollButton.classList.remove("opacity-50"); // Restore button opacity
  enrollButton.disabled = false;
    courseModel.classList.add("hidden");
    document.body.style.overflow = "auto"; 
});

enrollButton.addEventListener("click", () => {
  enrollButton.disabled = true; // Disable the button to make it unclickable
  enrollButton.classList.add("opacity-50"); // Optional: Add a class to visually indicate it's disabled
  
  const studentName = document.getElementById("studentName").value;
  const email = document.getElementById("email").value;
  const studentMobile = document.getElementById("studentMobile").value;

  // Prepare data to be submitted
  const formData = {
    name: studentName,
    email: email,
    mobile: studentMobile,
    course: courseHeading.textContent,
    price: coursePrice.textContent.split(" ")[1],
    subject: "Course Enroll" // Set email subject
  };

  const apiUrl = 'https://tsa-backend.fosspage.tech'; // Update with your backend URL

  fetch(`${apiUrl}/api/course/enquiry`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (!response.ok) {
      enrollButton.classList.remove("opacity-50"); // Restore button opacity
      enrollButton.disabled = false;
    courseModel.classList.add("hidden");
    document.body.style.overflow = "auto"; 
      throw new Error('Failed to submit course enquiry: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // Submit the form data using W3Forms after enquiry success
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        access_key: 'fc8e36bd-ad41-47af-b8f0-db3a51481a3c' // Moved access key to body
      })
    });
  })
  .then(response => {
    if (!response.ok) {
      enrollButton.classList.remove("opacity-50"); // Restore button opacity
      enrollButton.disabled = false;
    courseModel.classList.add("hidden");
    document.body.style.overflow = "auto"; 
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    alert("Your enquiry has been submitted successfully. We will contact you shortly.");
    enrollButton.disabled = false;
    enrollButton.classList.remove("opacity-50"); // Restore button opacity
    
    courseModel.classList.add("hidden");
    document.body.style.overflow = "auto"; // Enable scrolling when modal is closed
  })
  .catch(error => {
    console.error('Error:', error);
    alert("An error occurred while submitting your enquiry. Please try again.");
    enrollButton.disabled = false; // Re-enable button on error
    enrollButton.classList.remove("opacity-50"); // Restore button opacity
    
    document.body.style.overflow = "auto";
  });

  // Disable scrolling when the modal is open
  document.body.style.overflow = "hidden";
})

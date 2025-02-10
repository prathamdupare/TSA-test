// Sample JSON Data
const jsonData = {
  "All Campaigns": [
    {
      "title": "Clean Water Event",
      "date": "Jan 18, 2013",
      "location": "Melbourne City",
      "description": "Children face tough challenges: hunger, malnutrition, limited access to education and medical care.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This campaign focuses on providing clean water access to communities in need, ensuring that every child has the opportunity to thrive.",
      "objective": "To raise awareness about the importance of clean water and to provide sustainable solutions for water access."
    },
    {
      "title": "Food Distribution Drive",
      "date": "Feb 12, 2013",
      "location": "Sydney City",
      "description": "Providing meals to underprivileged families and children in need.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This initiative aims to alleviate hunger by distributing nutritious meals to families facing food insecurity.",
      "objective": "To ensure that no child goes to bed hungry and to promote community support for food distribution."
    },
    {
      "title": "School Supplies Campaign",
      "date": "Mar 05, 2013",
      "location": "Brisbane City",
      "description": "Helping children get the essential tools for education.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This campaign provides essential school supplies to children, enabling them to pursue their education without barriers.",
      "objective": "To empower children through education by ensuring they have the necessary tools to succeed."
    }
  ],
  "Disaster Rescue": [
    {
      "title": "Flood Relief Program",
      "date": "Apr 10, 2013",
      "location": "Queensland",
      "description": "Rescuing families affected by severe floods and providing emergency supplies.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This program focuses on providing immediate relief to families affected by floods, ensuring their safety and well-being.",
      "objective": "To deliver essential supplies and support to communities impacted by natural disasters."
    },
    {
      "title": "Earthquake Recovery Mission",
      "date": "May 15, 2013",
      "location": "Wellington",
      "description": "Supporting earthquake survivors with shelter and food.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This mission aims to provide critical support to earthquake survivors, helping them rebuild their lives after devastation.",
      "objective": "To facilitate recovery efforts and provide long-term support to affected communities."
    },
    {
      "title": "Cyclone Relief Efforts",
      "date": "Jun 20, 2013",
      "location": "Northern Territory",
      "description": "Providing relief to communities hit by cyclones.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This effort focuses on delivering aid and resources to communities impacted by cyclones, ensuring their recovery.",
      "objective": "To assist in the immediate and long-term recovery of cyclone-affected areas."
    }
  ],
  "Water Campaign": [
    {
      "title": "Clean Water Drive",
      "date": "Jul 25, 2013",
      "location": "Melbourne City",
      "description": "Ensuring clean drinking water for rural communities.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This drive aims to provide access to clean drinking water for rural communities, improving health and quality of life.",
      "objective": "To promote health and well-being by ensuring access to safe drinking water."
    },
    {
      "title": "Water Wells Project",
      "date": "Aug 30, 2013",
      "location": "Outback Australia",
      "description": "Building wells to provide sustainable water sources.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This project focuses on constructing wells in remote areas, providing communities with a reliable water source.",
      "objective": "To create sustainable water solutions that empower communities and enhance their resilience."
    },
    {
      "title": "Water Purification Campaign",
      "date": "Sep 05, 2013",
      "location": "Sydney City",
      "description": "Distributing water purifiers to ensure safe drinking water.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This campaign aims to distribute water purifiers to ensure that communities have access to safe drinking water.",
      "objective": "To reduce waterborne diseases by providing effective water purification solutions."
    }
  ],
  "Education": [
    {
      "title": "Scholarship Program",
      "date": "Oct 10, 2013",
      "location": "Brisbane City",
      "description": "Providing scholarships to underprivileged students.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This program offers scholarships to deserving students, enabling them to pursue higher education and achieve their dreams.",
      "objective": "To promote educational equity and empower underprivileged students through financial support."
    },
    {
      "title": "Book Donation Drive",
      "date": "Nov 15, 2013",
      "location": "Perth City",
      "description": "Collecting and distributing books to schools in need.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This drive focuses on collecting books for schools in need, fostering a love for reading and learning.",
      "objective": "To enhance educational resources and promote literacy among children."
    },
    {
      "title": "Teacher Training Workshops",
      "date": "Dec 05, 2013",
      "location": "Melbourne City",
      "description": "Empowering teachers with better tools and techniques.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "These workshops aim to equip teachers with innovative teaching methods and resources to improve student learning.",
      "objective": "To enhance the quality of education by empowering teachers with effective training."
    }
  ],
  "Health": [
    {
      "title": "Health Check-Up Camps",
      "date": "Jan 20, 2014",
      "location": "Melbourne City",
      "description": "Organizing free health camps for underprivileged communities.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This initiative organizes free health check-up camps to provide essential health services to underserved communities.",
      "objective": "To improve community health and access to medical care for those in need."
    },
    {
      "title": "Vaccination Drive",
      "date": "Feb 15, 2014",
      "location": "Sydney City",
      "description": "Providing vaccinations for children in rural areas.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This drive focuses on vaccinating children in rural areas, protecting them from preventable diseases.",
      "objective": "To ensure that all children have access to life-saving vaccinations and healthcare."
    },
    {
      "title": "Nutrition Awareness Program",
      "date": "Mar 05, 2014",
      "location": "Brisbane City",
      "description": "Educating families on nutrition and health.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This program educates families about nutrition, promoting healthy eating habits and lifestyle choices.",
      "objective": "To enhance community health through nutrition education and awareness."
    }
  ],
  "Mental Issue": [
    {
      "title": "Mental Health Awareness Drive",
      "date": "Apr 10, 2014",
      "location": "Melbourne City",
      "description": "Raising awareness about mental health issues.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This drive aims to raise awareness about mental health issues, reducing stigma and promoting understanding.",
      "objective": "To foster a supportive environment for mental health discussions and resources."
    },
    {
      "title": "Counseling Sessions",
      "date": "May 15, 2014",
      "location": "Sydney City",
      "description": "Providing free counseling sessions to those in need.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This initiative offers free counseling sessions to individuals seeking support for mental health challenges.",
      "objective": "To provide accessible mental health support and resources to the community."
    },
    {
      "title": "Support Groups Formation",
      "date": "Jun 20, 2014",
      "location": "Brisbane City",
      "description": "Creating support groups for mental health support.",
      "image": "assets/img/team/team_3_2.png",
      "cta": "Read more",
      "AboutTheCampaign": "This program focuses on forming support groups for individuals facing mental health issues, fostering community support.",
      "objective": "To create safe spaces for individuals to share experiences and receive support."
    },
  ]
}


// DOM Elements
const cardsContainer = document.getElementById("cards-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const paginationNumbers = document.getElementById("pagination-numbers");

// Pagination Variables
let currentPage = 1;
let currentFilter = "All Campaigns"
let currentArr = [];

// Function to load data into currentArr based on filter
function loadDataByFilter(filter) {
    if (filter === "All Campaigns") {
        // Merge all categories into the currentArr
        currentArr = Object.values(jsonData).flat();
        
    } else {
        // Load specific category
        currentArr = jsonData[filter] || [];
    }
}

// Initial load when page loads
loadDataByFilter(currentFilter);

const itemsPerPage = 9;
let totalPages = Math.ceil(currentArr.length / itemsPerPage);


function renderPaginationButtons(filter) {
    // Clear existing buttons
    paginationNumbers.innerHTML = "";
    const totalPagesfinal = Math.ceil(currentArr.length / itemsPerPage);
    totalPages = totalPagesfinal
    

    for (let i = 1; i <= totalPagesfinal; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.className = `px-3 py-2 rounded-full ${
        i === currentPage
          ? "bg-red-500 text-white"
          : "bg-white border-1 hover:bg-gray-400"
      }`;
  
      button.addEventListener("click", () => {
        currentPage = i;
        renderCards(currentPage);
        renderPaginationButtons();
      });
       
  
      paginationNumbers.appendChild(button);
    }
  }

// Function to Render Cards
function renderCards(page) {
    // Clear existing cards
    cardsContainer.innerHTML = "";

    // Calculate the starting and ending index
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, currentArr.length);

    // Add cards to the container
    const buttonColors = ["bg-red-100", "bg-green-100", "bg-yellow-100"]; // Define button colors
    const textColors = ["text-red-500", "text-green-500", "text-yellow-500"]; // Define button colors

for (let i = startIndex; i < endIndex; i++) {
  const card = currentArr[i];
  const buttonColor = buttonColors[i % buttonColors.length]; // Cycle through the colors
  const textColor = textColors[i % buttonColors.length]; // Cycle through the colors

  const cardHTML = `
    <div class="w-full mx-auto p-3 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img
        loading="lazy"
        class="w-full max-h-[250px] object-cover rounded-md"
        src=${card.image}
        alt=${card.title}
      />
      <div class="py-2 px-1">
        <h3 class="text-lg font-semibold text-gray-800">${card.title}</h3>
        <div class="mt-2 text-sm text-gray-500 flex items-center">
          <span class="mr-2 flex"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="${textColor} w-5 mr-1"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM15.5355 7.05025L10.5858 12L12 13.4142L16.9497 8.46447L15.5355 7.05025Z"></path></svg> ${card.date}</span> 
          <span class="flex"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="${textColor} w-5 mr-1"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path></svg> ${card.location}</span>
        </div>
        <p class="mt-4 text-gray-600 text-sm">
          ${card.description}
        </p>
        <div
          href="#"
          class="mt-4 inline-block ${buttonColor} cursor-pointer  text-white text-md font-medium p-4 py-3 hover:opacity-80 transition duration-300"
        >
          <span class="font-bold flex items-center ${textColor}" onclick='openCampaignModal(${JSON.stringify(card)}, "${textColor}")'>Read more <svg xmlns="http://www.w3.org/2000/svg" class="font-bold w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></span>
        </div>
      </div>
    </div>
  `;
  cardsContainer.innerHTML += cardHTML;
}

    // Update pagination info
    

    // Update button states
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    renderPaginationButtons();
}

// Event Listeners for Pagination
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderCards(currentPage);
    }
});

nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderCards(currentPage);
    }
});


const filterButtons = document.querySelectorAll(".filter-button");

filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Remove active style from all buttons
    filterButtons.forEach((btn) => {
      btn.classList.remove("bg-blue-900", "text-white");
      btn.classList.add("bg-gray-500", "text-black");
    });

    // Add active style to the clicked button
    event.target.classList.add("bg-blue-900", "text-white");
    event.target.classList.remove("bg-gray-500", "text-black");

      // Log the selected filter
      currentFilter = event.target.dataset.filter;
      loadDataByFilter(event.target.dataset.filter);
      renderPaginationButtons(event.target.dataset.filter)
      renderCards(1)
     
  });
});

// Initial Render
renderCards(currentPage);


function openCampaignModal(card,textColor) {
    // Stop scrolling
    document.body.style.overflow = "hidden";
    document.getElementById("CampaignModel").classList.remove("hidden");
    // Change values (example: setting campaign title and description)
    document.getElementById("campaignTitle").innerText = card.title;
    document.getElementById("CampaignImage").src = card.image;
   

    // Change campaign icons (assuming you want to change the SVG color)
    const campaignIcons = document.getElementById("CampaignIcons");
    
    campaignIcons.innerHTML = `<span class="mr-2 flex"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="${textColor} w-5 mr-1"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM15.5355 7.05025L10.5858 12L12 13.4142L16.9497 8.46447L15.5355 7.05025Z"></path></svg> ${card.date}</span> 
          <span class="flex"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="${textColor} w-5 mr-1"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path></svg> ${card.location}</span>`

    // Remove campaignLocation and CampaignDescription
    
    document.getElementById("CampaignDescription").innerText = card.description; // Clear description

    // Set new descriptions from aboutTheCampaign and objectives
    document.getElementById("aboutTheCampaign").querySelector("p").innerText = card.AboutTheCampaign;
    document.getElementById("objectives").querySelector("p").innerText = card.objective;

    // Show the modal
    
}

document.getElementById("closeCampaignModal").addEventListener('click',()=>{
    // Allow scrolling again
    document.body.style.overflow = "auto";
    
    // Hide the modal
    document.getElementById("CampaignModel").classList.add("hidden");
})

// Event listener for the close button
document.getElementById("closeModal").addEventListener("click", closeModal);




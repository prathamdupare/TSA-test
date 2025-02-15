var Sessiondata = []

async function fetchSessionData(type) {
    const response = await fetch("https://tsa-backend.fosspage.tech/api/session");
    const data = await response.json().then((data)=>{
        Sessiondata = data
        renderCards(data, type);
    })
    

  }

  function createCard(session,i) {
    const buttonColors = ["bg-yellow-500", "bg-[#87b1fa]", "bg-green-700"];
    const hoverbuttonColors = ["bg-yellow-600", "bg-[#6496ed]", "bg-green-900"];
    const buttonColor = buttonColors[i % buttonColors.length];
    const hoverbuttonColor = hoverbuttonColors[i % buttonColors.length];
   
    
    return `
    
      <div class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
  <!-- Image Section -->
  <div class="relative">
    <img loading="lazy" src="https://tsa-backend.fosspage.tech/${session.Image}" alt="${session.name}" class="w-full max-h-[20vh] object-cover">
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
    ${
      session.selfHelpCredit > 0
        ? `<p class="text-center font-bold text-[#18ced6] text-sm mt-4">${session.selfHelpCredit} Self Help Credit Worth: ₹${session.selfHelpCredit*500}</p>`
        : ""
    }

    <!-- Final Price -->
    <p class="text-center text-teal-700 font-bold text-xl mt-6">₹${session.price}</p>

    <!-- Button -->
    <button class="w-full mt-4 py-3 ${buttonColor} hover:${hoverbuttonColor} text-white text-sm font-bold rounded-b-lg" onclick='openSessionModel(${JSON.stringify(session)})'>
      Get Therapy
    </button>
  </div>
</div>
    `;
  }

  // Function to render cards based on type
  function renderCards(sessions, type) {
    const cardContainer = document.getElementById("session-card-container");
    
    cardContainer.innerHTML = ""; // Clear existing cards
    const filteredSessions = type ? sessions.filter(session => session.type === type) : sessions;
    filteredSessions.forEach((session,index) => {
      cardContainer.innerHTML += createCard(session,index);
    });
  }

  // Event listeners for filter buttons
  document.getElementById("individualBtn").addEventListener("click", () => {
   
    renderCards(Sessiondata,"Individual");
    document.getElementById("individualBtn").classList.add("bg-teal-500", "text-white");
    document.getElementById("individualBtn").classList.remove("bg-white", "text-teal-500");
    document.getElementById("coupleBtn").classList.remove("bg-teal-500", "text-white");
    document.getElementById("coupleBtn").classList.add("bg-white", "text-teal-500");
       
  });

  document.getElementById("coupleBtn").addEventListener("click", () => {
   
    renderCards(Sessiondata,"Couple");
    document.getElementById("coupleBtn").classList.add("bg-teal-500", "text-white");
    document.getElementById("coupleBtn").classList.remove("bg-white", "text-teal-500");
    document.getElementById("individualBtn").classList.remove("bg-teal-500", "text-white");
    document.getElementById("individualBtn").classList.add("bg-white", "text-teal-500");
   
  });

  // Initial render (show all cards)
  

  fetchSessionData()

  const sessionModel = document.getElementById("sessionModel");
  const closeSessionModalButton = document.getElementById("closeSessionModal");
  const sessionHeading = document.getElementById("sessionHeading");
  const sessionImage = document.getElementById("sessionImage");
  const sessionDescription = document.getElementById("sessionDescription");
  const bookSessionButton = document.getElementById("bookSessionButton");
  const sessionDuration = document.getElementById("sessionDuration");
  const sessionPrice = document.getElementById("sessionPrice");
  const sessionPaymentOption = document.getElementById("sessionPaymentOption");

  const openSessionModel = (session) => {
    document.body.style.overflow = "hidden";
    sessionModel.classList.remove("hidden");
    sessionHeading.textContent = session.name.toUpperCase();
    sessionImage.src = `https://tsa-backend.fosspage.tech/${session.Image}`; // Assuming session object has an image property
    sessionDescription.innerHTML = session.description; // Assuming session object has a description property
    sessionDuration.textContent = `Duration: 45 min to 1 Hours`; // Assuming session object has a duration property
    sessionPrice.textContent = `Price: ₹${session.price}`; // Assuming session object has a price property
  }

  closeSessionModalButton.addEventListener("click", () => {
    sessionModel.classList.add("hidden");
    document.body.style.overflow = "auto";
    bookSessionButton.disabled = false; // Disable the button to make it unclickable
    bookSessionButton.classList.remove("opacity-50");
  });

  bookSessionButton.addEventListener("click", () => {
    const studentName = document.getElementById("sessionStudentName").value;
    const email = document.getElementById("sessionEmail").value;
    const studentMobile = document.getElementById("sessionMobile").value;

   
    bookSessionButton.disabled = true; // Disable the button to make it unclickable
    bookSessionButton.classList.add("opacity-50");
   

    if (!studentName || !email || !studentMobile) {
        alert("Please fill in all fields.");
        bookSessionButton.disabled = false; // Disable the button to make it unclickable
    bookSessionButton.classList.remove("opacity-50");
        return;
    }


    

    // Prepare data to be submitted
    const sessionId = Sessiondata.find(session => session.name.toUpperCase() === sessionHeading.textContent)?._id;
    if (!sessionId) {
        alert("Session not found. Please try again.");
        bookSessionButton.disabled = false; // Disable the button to make it unclickable
    bookSessionButton.classList.remove("opacity-50");
        return;
    }
     // Add session ID to the form data
    const formData = {
      name: studentName,
      email: email,
      mobile: studentMobile,
      type: "Session booking",
      session: sessionId,
      price: sessionPrice.textContent.split(" ")[1],
      subject: "Session Booking" // Set email subject
    };

    const apiUrl = 'https://tsa-backend.fosspage.tech'; // Update with your backend URL
    if (!sessionPaymentOption.checked) {
      // If payment option is checked, proceed with payment
      
      
      fetch(`${apiUrl}/api/orders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData,
          amount: sessionPrice.textContent.split(" ")[1].slice(1) , // Amount in paise
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          
          openRazorpayCheckout(data.orderId, sessionPrice.textContent.split(" ")[1].slice(1), { name: studentName, email: email, mobile: studentMobile }, formData);
        } else {
          alert("Failed to create payment order. Please try again.");
          bookSessionButton.disabled = false; // Disable the button to make it unclickable
    bookSessionButton.classList.remove("opacity-50");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("An error occurred while creating the payment order.");
        bookSessionButton.disabled = false; // Disable the button to make it unclickable
    bookSessionButton.classList.remove("opacity-50");
      });
    } else {
      // If payment option is not checked, send email directly

      fetch(`${apiUrl}/api/sessionRequest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData,
          amount: sessionPrice.textContent.split(" ")[1].slice(1), // Amount in paise
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
        }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create session request: ' + response.statusText);
        }
        return response.json();
      })
      .then(() => {
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
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        alert("Your session has been booked successfully. We will contact you shortly.");
        sessionModel.classList.add("hidden");
        document.body.style.overflow = "auto";
        bookSessionButton.disabled = false; // Disable the button to make it unclickable
    bookSessionButton.classList.remove("opacity-50");
      })
      .catch((error) => {
        alert('Error:', error);
        
        bookSessionButton.disabled = false; // Disable the button to make it unclickable
    bookSessionButton.classList.remove("opacity-50");
      });
    }
  });

  function openRazorpayCheckout(orderId, amount, user, formData) {
    const options = {
      key: "rzp_test_jZRMdLpQqUaFhK", // Replace with your Razorpay public key
      amount: amount, // Amount in paise
      currency: "INR",
      name: "The School Academy",
      description: "Session Booking",
      order_id: orderId, // Razorpay orderId
      handler: function (response) {
        verifySessionPayment(response, formData, orderId, amount, user); // Send payment details to the backend for verification
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.mobile,
      },
      theme: {
        color: "#000080",
      },
    };

    const rzp = new Razorpay(options);
    rzp.on("payment.failed", function (response) {
      sessionModel.classList.add("hidden");
      alert("Payment failed. Please try again.");
    });

    rzp.open();
  }

  function verifySessionPayment(paymentDetails, formData, orderId, amount, user) {
    const apiUrl = 'https://tsa-backend.fosspage.tech';
    fetch(`${apiUrl}/api/payments/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentDetails),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        sessionModel.classList.add("hidden");
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            orderId,
            payment: "confirm",
            amount,
            access_key: 'fc8e36bd-ad41-47af-b8f0-db3a51481a3c' // Moved access key to body
          })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          alert("Your session has been booked successfully. We will contact you shortly.");
          sessionModel.classList.add("hidden");
          document.body.style.overflow = "auto";
        })
      } else {
        sessionModel.classList.add("hidden");
        document.body.style.overflow = "auto";
        alert("Payment verification failed. Please contact support.");
      }
    })
    .catch((error) => {
      sessionModel.classList.add("hidden");
      document.body.style.overflow = "auto";
      alert("An error occurred while verifying the payment.");
    });
  }
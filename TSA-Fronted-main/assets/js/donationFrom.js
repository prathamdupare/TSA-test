// Select modal elements
const donateNowButton = document.getElementById("donateNow");
const donationModal = document.getElementById("donationModal");
const closeModalButton = document.getElementById("closeModal");
const amountButtons = document.querySelectorAll(".amount-btn");
const customAmountInput = document.getElementById("customAmount");
const donerNameEle = document.getElementById("donerName");
const donerEmailEle= document.getElementById("donerEmail");
const donerMobileEle = document.getElementById("donerMobile");
const donateButton = document.getElementById("donateButton");
const donateButtonAbsolute = document.getElementById("donateAbsolutebtn");



// Active states
let selectedType = "Give Once"; // Default type
let selectedAmount = ""; // Default amount

// Open modal
donateNowButton.addEventListener("click", () => {
  document.body.style.overflow = "hidden";
  donationModal.classList.remove("hidden");
});

donateButtonAbsolute.addEventListener("click", () => {
  document.body.style.overflow = "hidden";
  donationModal.classList.remove("hidden");
});



// Close modal
closeModalButton.addEventListener("click", () => {
  donationModal.classList.add("hidden");
  document.body.style.overflow = "auto";
  donateButton.classList.remove("opacity-50");
  donateButton.disabled = flase;
});

// Close modal when clicking outside the modal content
donationModal.addEventListener("click", (event) => {
  if (event.target === donationModal) {
    donationModal.classList.add("hidden");
    document.body.style.overflow = "auto";
    donateButton.classList.remove("opacity-50");
    donateButton.disabled = flase;
  }
});

// Handle type selection (Give Once / Monthly)


// Handle amount button clicks
amountButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Set the custom amount input value to the button's data-amount
    const amount = button.getAttribute("data-amount");
    customAmountInput.value = amount;
    // Remove highlight from other buttons and highlight the clicked one
    amountButtons.forEach((btn) => btn.classList.remove("bg-[#000080]", "text-white"));
    button.classList.add("bg-[#000080]", "text-white");

    // Update selected amount
    selectedAmount = amount;
  });
});

// Handle custom input
customAmountInput.addEventListener("input", () => {
  // Clear selected amount if custom input is used
  amountButtons.forEach((btn) => btn.classList.remove("bg-[#000080]", "text-white"));
  selectedAmount = customAmountInput.value;
});

// Handle donate button click
donateButton.addEventListener("click", () => {
  donateButton.disabled = true; // Disable the button to make it unclickable
  donateButton.classList.add("opacity-50");
    const donationDetails = {
      type: selectedType, // 'Give Once' or 'Monthly'
      amount: selectedAmount || customAmountInput.value,
    };
  
    if (!donationDetails.amount || donationDetails.amount <= 0) {
      alert("Please enter a valid donation amount.");
      donationModal.classList.add("hidden");
          document.body.style.overflow = "auto";
          donateButton.classList.remove("opacity-50");
          donateButton.disabled = flase;
        donationModal.classList.add("hidden");
      return;
    }

    const donerName = donerNameEle.value || "Unknown";
    const donerEmail = donerEmailEle.value || "Unknown";
    const donerMobile = donerMobileEle.value || "0000000000";
    
  
  
    
    
  
  // Print donation details to console
  
   
    const apiUrl = 'https://tsa-backend.fosspage.tech';
  
    // Call the backend to create a Razorpay order
    fetch(`${apiUrl}/api/orders/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: donationDetails.amount, // Amount in paise (Razorpay requires this format)
        currency: "INR",
        donerName: donerName,
        donerEmail: donerEmail,
        donerMobile: donerMobile,
        receipt: `receipt_${Date.now()}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Open Razorpay Checkout with the returned orderId
          openDonationRazorpayCheckout(data.orderId, donationDetails.amount, {name: donerName, email: donerEmail, mobile: donerMobile });
        } else {
          donationModal.classList.add("hidden");
          document.body.style.overflow = "auto";
          donateButton.classList.remove("opacity-50");
          donateButton.disabled = flase;
        donationModal.classList.add("hidden");
          alert("Failed to create Razorpay order. Please try again.");
        }
      })
      .catch((error) => {
        donationModal.classList.add("hidden");
          document.body.style.overflow = "auto";
          donateButton.classList.remove("opacity-50");
          donateButton.disabled = flase;
        donationModal.classList.add("hidden");
        alert("An error occurred. Please try again.");
      });
  });
  function openDonationRazorpayCheckout(orderId, amount, user) {
    const options = {
      key: "rzp_test_jZRMdLpQqUaFhK", // Replace with your Razorpay public key
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "The School Academy",
      description: "Donation",
      order_id: orderId, // Razorpay orderId
      handler: function (response) {
        verifyDonationPayment(response, orderId, amount, user.name, user.email,user.mobile); // Send payment details to the backend for verification
      },
      prefill: {
        name: user.name, // You can collect this data from your form
        email: user.email, // Optional: Collect from the user
        contact: user.mobile, // Optional: Collect from the user
      },
      theme: {
        color: "#000080", // Customize the color
      },
    };
  
    const rzp = new Razorpay(options);
    rzp.on("payment.failed", function (response) {
      donationModal.classList.add("hidden");
          document.body.style.overflow = "auto";
          donateButton.classList.remove("opacity-50");
          donateButton.disabled = flase;
        donationModal.classList.add("hidden");
      alert("Payment failed. Please try again.");
    });
  
    rzp.open();
  }
function verifyDonationPayment(paymentDetails, orderId, amount,donerName, donerEmail, donerMobile) {
    const apiUrl = 'https://tsa-backend.fosspage.tech';
    fetch(`${apiUrl}/api/payments/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Send email with W3Forms
          const formData = {
            name: donerName || "unknown",
            email: donerEmail,
            mobile: donerMobile,
            amount: amount,
            orderId: orderId,
            payment: 'confirm',
            subject: "Donation Verification" // Set email subject
          };

          fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...formData,
              access_key: 'fc8e36bd-ad41-47af-b8f0-db3a51481a3c' // Access key for W3Forms
            })
          })
          .then(response => response.json())
          .then(emailData => {
            if (emailData.success) {

              alert("Donation Successful! Thank you for your support.");
              donationModal.classList.add("hidden");
          document.body.style.overflow = "auto";
          donateButton.classList.remove("opacity-50");
          donateButton.disabled = flase;
        donationModal.classList.add("hidden");
            } else {
              alert("Donation Successful! However, there was an issue sending the confirmation email.");
              donationModal.classList.add("hidden");
          document.body.style.overflow = "auto";
          donateButton.classList.remove("opacity-50");
          donateButton.disabled = flase;
        donationModal.classList.add("hidden");
            }
          })
          .catch(error => {
            console.error('Error sending email:', error);
            alert("Donation Successful! However, there was an error sending the confirmation email.");
            donationModal.classList.add("hidden");
          document.body.style.overflow = "auto";
          donateButton.classList.remove("opacity-50");
          donateButton.disabled = flase;
        donationModal.classList.add("hidden");
            
            
          });

          donationModal.classList.add("hidden");
          document.body.style.overflow = "auto";
          donateButton.classList.remove("opacity-50");
          donateButton.disabled = flase;
        donationModal.classList.add("hidden");
        } else {
          donationModal.classList.add("hidden");
          document.body.style.overflow = "auto";
          donateButton.classList.remove("opacity-50");
          donateButton.disabled = flase;
        donationModal.classList.add("hidden");
          alert("Payment verification failed. Please contact support.");
        }
      })
      .catch((error) => {
         // Disable the button to make it unclickable
        donateButton.classList.remove("opacity-50");
        donateButton.disabled = flase;
        donationModal.classList.add("hidden");
        document.body.style.overflow = "auto";
        alert("An error occurred while verifying the payment.");
      });
  }


document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = true; // Disable the submit button

    // Gather form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        number: document.getElementById('number').value,
        message: document.getElementById('message').value,
        access_key: 'fc8e36bd-ad41-47af-b8f0-db3a51481a3c' // Include access key for W3Form
    };

    // Send a fetch request to the API
    fetch('https://tsa-backend-thuu.onrender.com/api/contact/enquiry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Use W3Form to send mail
        return fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                message: formData.message,
                access_key: "fc8e36bd-ad41-47af-b8f0-db3a51481a3c" // Send access key with the mail request
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
        // Optionally, show a success message to the user
        alert('Your message has been sent successfully!');
        window.location.reload()
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        document.querySelector('.form-messages').innerText = 'There was an error sending your message. Please try again.';
    })
    .finally(() => {
        submitButton.disabled = false; // Re-enable the submit button
    });
});

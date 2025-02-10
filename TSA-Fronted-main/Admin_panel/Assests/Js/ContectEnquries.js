const contactEnquiries = [];

async function getAllContactEnquiries() {
    const apiUrl = 'https://tsa-backend-thuu.onrender.com'; // Ensure this matches your backend URL
    try {
        const response = await fetch(`${apiUrl}/api/contact`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
            }
        });

        if (response.ok) {
            const enquiries = await response.json();
            const sortedEnquiries = enquiries.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            contactEnquiries.push(...sortedEnquiries);
            
            renderContactEnquiries(contactEnquiries);
        } else {
            const errorData = await response.json();
            console.error('Failed to retrieve contact enquiries:', errorData);
        }
    } catch (error) {
        console.error('Error fetching contact enquiries:', error);
    }
}

const searchEnquiryInput = document.getElementById('contactEnquiriesSearch');

searchEnquiryInput.addEventListener('input', () => {
    const searchTerm = searchEnquiryInput.value.toLowerCase();
    const filteredEnquiries = contactEnquiries.filter(enquiry => {
        const matchesEmail = enquiry.email.toLowerCase().includes(searchTerm);
        const matchesPhone = enquiry.phone.includes(searchTerm);
        const matchesName = enquiry.name.toLowerCase().includes(searchTerm);
        
        return matchesEmail || matchesPhone || matchesName;
    });

    // If the search term is empty, render all enquiries
    renderFilteredContactEnquiries(searchTerm === "" ? contactEnquiries : filteredEnquiries);
});

function renderFilteredContactEnquiries(enquiries) {
    const contactEnquiryTableBody = document.getElementById('contactEnquirySearchTable');
    contactEnquiryTableBody.innerHTML = ''; // Clear existing table rows
    enquiries.forEach(enquiryData => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.name}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.email}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.phone}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.message}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${new Date(enquiryData.createdAt).toLocaleString()}</td>
        `;
        contactEnquiryTableBody.appendChild(row);
    });
}

function renderContactEnquiries(enquiries) {
    const contactEnquiryTableBody = document.getElementById('contactEnquiryTable');
    contactEnquiryTableBody.innerHTML = ''; // Clear existing table rows
    enquiries.forEach(enquiryData => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.name}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.email}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.phone}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.message}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${new Date(enquiryData.createdAt).toLocaleString()}</td>
        `;
        contactEnquiryTableBody.appendChild(row);
    });
}

// Call the function to fetch and render contact enquiries
getAllContactEnquiries();

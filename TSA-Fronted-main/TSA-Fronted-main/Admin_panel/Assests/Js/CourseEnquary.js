const contactEnquiries = [];

async function getAllContactEnquiries() {
    const apiUrl = 'https://tsa-backend-thuu.onrender.com'; // Ensure this matches your backend URL
    try {
        const response = await fetch(`${apiUrl}/api/course/enquiry`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
            }
        });
       

        if (response.ok) {
            const enquiries = await response.json();
            const sortedEnquiries = enquiries.data.sort((a, b) => new Date(b.enquiryDate) - new Date(a.enquiryDate));
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
        const matchesEmail = enquiry.studentEmail.toLowerCase().includes(searchTerm);
        const matchesPhone = enquiry.studentMobile.includes(searchTerm);
        const matchesName = enquiry.studentName.toLowerCase().includes(searchTerm);
        const matchesCourse = enquiry.courseName.toLowerCase().includes(searchTerm);
        
        
        return matchesEmail || matchesPhone || matchesName || matchesCourse;
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
        <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.studentName.toUpperCase()}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.studentEmail}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.studentMobile}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.courseName}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${new Date(enquiryData.enquiryDate).toLocaleString()}</td>
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
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.studentName.toUpperCase()}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.studentEmail}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.studentMobile}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${enquiryData.courseName}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${new Date(enquiryData.enquiryDate).toLocaleString()}</td>
        `;
        contactEnquiryTableBody.appendChild(row);
    });
}

// Call the function to fetch and render contact enquiries
getAllContactEnquiries();

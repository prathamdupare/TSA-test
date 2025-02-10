const donationsArr = [];

async function getAllDonations() {
    const apiUrl = 'https://tsa-backend-thuu.onrender.com'; // Ensure this matches your backend URL
    try {
        const response = await fetch(`${apiUrl}/api/donations`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
            }
        });

        if (response.ok) {
            const donations = await response.json();
            const sortedDonations = donations.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            donationsArr.push(...sortedDonations);
            const totalDonationAmount = sortedDonations.reduce((total, donation) => donation.status === 'confirm' ? total + donation.amount : total, 0) / 10;
           
            document.getElementById('totalDonation').textContent = '₹ '+totalDonationAmount
            
            
            // You can add code here to display the donations in your UI
        } else {
            const errorData = await response.json();
            console.error('Failed to retrieve donations:', errorData);
        }
    } catch (error) {
        console.error('Error fetching donations:', error);
    }
}

// Call the function to fetch donations
getAllDonations();



let currentChunk = 0;
const chunkSize = 10;

function renderDonations() {
    const donationTable = document.getElementById('donationTable'); // Ensure this ID matches your table's ID in the HTML
    donationTable.innerHTML = ''; // Clear existing table rows

    const start = currentChunk * chunkSize;
    const end = start + chunkSize;
    const donationsToShow =  donationsArr.slice(start, end);

    if(donationsToShow.length == 0){
        const row = document.createElement('tr');
        row.innerHTML = '<td class="px-2 text-center py-4 whitespace-nowrap text-sm text-red-500">Not have any payments yet</td>'
        donationTable.appendChild(row)
    }

    donationsToShow.forEach((donation) => { 
        
        const row = document.createElement('tr');
        row.classList.add("hover:font-bold");
        row.classList.add("cursor-pointer");
        row.innerHTML = `
        <td class="px-5 text-center  py-4 whitespace-nowrap text-sm text-gray-900">₹ ${donation.amount}</td>
        <td class="px-5 text-center py-4 whitespace-nowrap text-sm text-gray-900">${new Date(donation.createdAt).toLocaleString()}</td>
        <td class="px-5 text-center py-4 whitespace-nowrap text-sm text-gray-900">${donation.currency}</td>
        <td class="px-5 text-center py-4 whitespace-nowrap text-sm text-gray-900">${donation.donerEmail !== 'Unknown' ? donation.donerEmail : 'N/P'}</td>
        <td class="px-5 text-center py-4 whitespace-nowrap text-sm text-gray-900">${donation.donerMobile !== '0000000000' ? donation.donerMobile : 'N/P'}</td>
        <td class="px-5 text-center py-4 whitespace-nowrap text-sm text-gray-900">${donation.donerName !== 'Unknown' ? donation.donerName.toUpperCase() : 'N/P'}</td>
        <td class="px-5 text-center py-4 whitespace-nowrap text-sm text-gray-900">${donation.orderId}</td>
        <td class="px-5 text-center py-4 whitespace-nowrap text-sm text-gray-900">${donation.receipt}4</td>
        <td class="px-5 text-center py-4 whitespace-nowrap text-sm text-gray-900">${donation.status}</td>
        `;
        donationTable.appendChild(row);
    });

    const footerRow = document.createElement('tr');
    
    footerRow.innerHTML = `
        <td colspan="9" class="px-5 py-4 ">
         
            <button id="backButton" class="bg-gray-500 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded">
               Go Back
            </button>
            <button id="seeMoreButton" class="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded" ${end >= donationsArr.length ? 'disabled' : ''}>
                See next
            </button>
        </td>
    `;
    donationTable.appendChild(footerRow);

   

   
    document.getElementById('seeMoreButton').addEventListener('click', () => {
        currentChunk++;
        renderDonations(); // Call the function to render the next chunk of donations
    });

    document.getElementById('backButton').addEventListener('click', () => {
        if (currentChunk > 0) {
            currentChunk--;
            renderDonations(); // Call the function to render the previous chunk of donations
        }
    });
}




// Call the render function after fetching donations
getAllDonations().then(renderDonations);


// Call the render function after fetching donations




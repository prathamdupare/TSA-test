const OnlineSessionBooked = [];
const SessionRequestsArr = []

async function getAllSession() {
    const apiUrl = 'https://tsa-backend.fosspage.tech'; // Ensure this matches your backend URL
    try {
        const response = await fetch(`${apiUrl}/api/sessionRequest`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
            }
        });

        if (response.ok) {
            const Session = await response.json();
            const sortedSession = Session.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
            const confirmedOnlineSessions = sortedSession.filter(session => session.status === 'confirm' && session.paymentMode === 'online');
            const SessionRequests = sortedSession.filter(session =>  session.paymentMode === 'Offline');
            OnlineSessionBooked.push(...confirmedOnlineSessions);
            SessionRequestsArr.push(...SessionRequests)
            
            
            
            
            const totalOnlineConfirmSessionAmount = sortedSession.reduce((total, session) => session.status === 'confirm' && session.paymentMode === 'online' ? total + session.amount : total, 0);
            document.getElementById('SessionTotalPayment').textContent = '₹ ' + totalOnlineConfirmSessionAmount;
            
            renderSessionRequests(SessionRequestsArr);
            renderSessions(); // Call the render function after fetching sessions
        } else {
            const errorData = await response.json();
            console.error('Failed to retrieve Session:', errorData);
        }
    } catch (error) {
        console.error('Error fetching Session:', error);
    }
}

let currentSessionChunk = 0;
const sessionChunkSize = 10;

function renderSessions() {
    const sessionTableBody = document.getElementById('sessionTable');
    sessionTableBody.innerHTML = ''; // Clear existing table rows

    const start = currentSessionChunk * sessionChunkSize;
    const end = start + sessionChunkSize;
    const sessionsToShow =  OnlineSessionBooked.slice(start, end);

    if(sessionsToShow.length == 0){
        const row = document.createElement('tr');
        row.innerHTML = '<td class="px-2 text-center py-4 whitespace-nowrap text-sm text-red-500">Not have any confirm payments yet</td>'
        sessionTableBody.appendChild(row);
    }

    sessionsToShow.forEach(sessionData => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.price}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${new Date(sessionData.createdAt).toLocaleString()}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.currency}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.email}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.mobile.length === 12 ? '+' + sessionData.mobile : sessionData.mobile}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.name}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.orderId}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.receipt}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.status == 'cancle' ? 'Not confirm' : sessionData.status }</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${ sessionData.paymentMode }</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData?.session?.name || 'deleted Session'}</td>
            `;
        sessionTableBody.appendChild(row);
    });

    // Footer with button to show all sessions
    if(OnlineSessionBooked.length > 10){const footerRow = document.createElement('tr');
    footerRow.innerHTML = `
        <td colspan="12" class="px-2 py-4 text-center">
            <button id="showAllSessionsButton" class="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded">
                Show All
            </button>
        </td>
    `;
    sessionTableBody.appendChild(footerRow);}

   
}


const searchInput = document.getElementById('sessionConfirmaPaymentSearch');

searchInput.addEventListener('input', () => {
    
    const searchTerm = searchInput.value.toLowerCase();
    const searchTerms = searchTerm.split(',').map(term => term.trim());
    
    const filteredSessions = OnlineSessionBooked.filter(session => {
       
        const matchesEmail = searchTerms.some(term => session.email.toLowerCase().includes(term));
        const matchesMobile = searchTerms.some(term => session.mobile.replace(/^(0|\+91)/, '').includes(term));
        const matchesOrderId = session.orderId.toLowerCase().includes(searchTerm);
        
        return matchesEmail || matchesMobile || matchesOrderId;
    });

    // If the search term is empty, render all sessions
    if (searchTerm === "") {
        renderSearchSession(OnlineSessionBooked);
    } else {
        renderSearchSession(filteredSessions);
    }
});

function renderSearchSession(sessions) {
    const sessionTableBody = document.getElementById('sessionTable');
    sessionTableBody.innerHTML = ''; // Clear existing table rows
    sessions.forEach(sessionData => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.price}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${new Date(sessionData.createdAt).toLocaleString()}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.currency}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.email}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.mobile.length === 12 ? '+' + sessionData.mobile : sessionData.mobile}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.name}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.orderId}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.receipt}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.status}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.paymentMode}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.session}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${sessionData.type}</td>
        `;
        sessionTableBody.appendChild(row);
    });
}


getAllSession();



const searchRequestInput = document.getElementById('sessionRequestsSearch');

searchRequestInput.addEventListener('input', () => {
    
    const searchTerm = searchRequestInput.value.toLowerCase();
    const searchTerms = searchTerm.split(',').map(term => term.trim());
    
    const filteredRequests = SessionRequestsArr.filter(request => {
        const matchesEmail = searchTerms.some(term => request.email.toLowerCase().includes(term));
        const matchesMobile = searchTerms.some(term => request.mobile.replace(/^(0|\+91)/, '').includes(term));
        const matchesOrderId = request.orderId.toLowerCase().includes(searchTerm);
        
        return matchesEmail || matchesMobile || matchesOrderId;
    });

    // If the search term is empty, render all requests
    if (searchTerm === "") {
        renderSessionRequests(SessionRequestsArr);
    } else {
        renderSessionRequests(filteredRequests);
    }
});

function renderSessionRequests(requests) {
    const sessionRequestTableBody = document.getElementById('sessionRequestTable');
    sessionRequestTableBody.innerHTML = ''; // Clear existing table rows
    requests.forEach(requestData => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${requestData.price}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${new Date(requestData.createdAt).toLocaleString()}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${requestData.currency}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${requestData.email}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${requestData.mobile.length === 12 ? '+' + requestData.mobile : requestData.mobile}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${requestData.name}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${requestData.orderId}</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${requestData.receipt}</td>
            
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${requestData.status == 'cancle' ? 'Not confirm' : requestData.status }</td>
            <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${ requestData.paymentMode }</td>
             <td class="px-2 text-center py-4 whitespace-nowrap text-sm text-gray-900">${requestData?.session?.name || 'deleted Session'}</td>
        `;
        sessionRequestTableBody.appendChild(row);
    });
}

// Call the function to fetch and render session requests





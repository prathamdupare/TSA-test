function isTokenValid() {
    const token = sessionStorage.getItem('authToken');
    const expiryTime = sessionStorage.getItem('tokenExpiry');
  
    if (!token || !expiryTime) {
      return false; // No token or expiry time
    }
  
    if (Date.now() > parseInt(expiryTime, 10)) {
      sessionStorage.removeItem('authToken'); // Remove expired token
      sessionStorage.removeItem('tokenExpiry');
      return false; // Token has expired
    }
  
    return true; // Token is valid
}
  

if (isTokenValid()) {
    window.location.href = '/admin_panel/index.html'
}


const apiUrl = 'https://tsa-backend.fosspage.tech';







async function handleLogin(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form data
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    // Check if fields are empty
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

   
  
    try {
      // Send login request to the server
      const response = await fetch(`${apiUrl}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      // Parse the JSON response
        const data = await response.json();
       
  
        if (response.ok) {
          
            const token = data.token; // Assuming the server sends the token as `token`
      const expiryTime = Date.now() + 60 * 60 * 1000; // Current time + 1 hour

      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('tokenExpiry', expiryTime);
            
          // Login successful
          
        alert('Login successful!');
        // Redirect to dashboard or another page
        
        window.location.href = '/admin_panel/index.html';
      } else {
        // Handle login error
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  }
  
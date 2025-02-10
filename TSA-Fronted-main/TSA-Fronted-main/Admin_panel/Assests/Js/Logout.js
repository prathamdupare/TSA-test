



const logoutbutton = document.getElementById('logoutbutton')


const logout =  () => {
    sessionStorage.removeItem('authToken'); // Remove expired token
    sessionStorage.removeItem('tokenExpiry');
    window.location.reload()
}
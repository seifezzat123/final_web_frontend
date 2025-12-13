document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    try {
        const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'home.HTML';
        } else {
            alert(data.error || 'Login failed');
        }
    } catch (err) {
        console.error(err);
        alert('Could not connect to server. Try again later.');
    }   
});

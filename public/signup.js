document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const role = document.getElementById('signupRole').value;

    if (!name || !email || !password || !role) {
        alert('All fields are required');
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            credentials: 'include',
            body: JSON.stringify({ name, email, password, role })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            alert(data.message);
            window.location.href = 'home.HTML';
        } else {
            alert(data.error || 'Signup failed');
        }
    } catch (err) {
        console.error(err);
        alert('Could not connect to server. Try again later.');
    }   
});

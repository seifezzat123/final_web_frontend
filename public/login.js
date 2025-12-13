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
            
            // Check if backend returns role in login response
            if (data.user && data.user.ROLE) {
                localStorage.setItem('userRole', data.user.ROLE);
                if (data.user.ROLE === 'seller') {
                    window.location.href = 'seller.HTML';
                } else {
                    window.location.href = 'home.HTML';
                }
            } else if (data.role) {
                localStorage.setItem('userRole', data.role);
                if (data.role === 'seller') {
                    window.location.href = 'seller.HTML';
                } else {
                    window.location.href = 'home.HTML';
                }
            } else {
                // Role not in response, keep existing role or default to buyer
                const existingRole = localStorage.getItem('userRole') || 'buyer';
                localStorage.setItem('userRole', existingRole);
                if (existingRole === 'seller') {
                    window.location.href = 'seller.HTML';
                } else {
                    window.location.href = 'home.HTML';
                }
            }
        } else {
            alert(data.error || 'Login failed');
        }
    } catch (err) {
        console.error(err);
        alert('Could not connect to server. Try again later.');
    }   
});

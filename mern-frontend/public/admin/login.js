document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('adminToken', data.token); // ✅ use consistent key
        window.location.href = '/admin/dashboard';       // ✅ consistent with server.js
      } else {
        alert(data.error || 'Invalid credentials');
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      alert('Error: ' + err.message);
    });
});

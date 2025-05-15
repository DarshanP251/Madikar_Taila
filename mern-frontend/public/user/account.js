const token = localStorage.getItem('token'); // Assuming token stored after login

if (!token) {
  alert('Please login first.');
  window.location.href = '/admin/login.html'; // adjust if needed
}

// Fetch user profile
fetch('/api/users/me', {
  headers: { Authorization: `Bearer ${token}` }
})
.then(res => res.json())
.then(user => {
  document.getElementById('userName').innerText = user.name;
  document.getElementById('userEmail').innerText = user.email;
  if (user.addresses) {
    user.addresses.forEach(address => addAddressToList(address));
  }
})
.catch(err => console.error(err));

// Fetch cart items
fetch('/api/users/cart', {
  headers: { Authorization: `Bearer ${token}` }
})
.then(res => res.json())
.then(cart => {
  const cartList = document.getElementById('cartItems');
  cart.items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.productId.name} - Qty: ${item.quantity}`;
    cartList.appendChild(li);
  });
})
.catch(err => console.error(err));

function addAddress() {
  const addressInput = document.getElementById('newAddress');
  const address = addressInput.value;
  if (!address) return;

  fetch('/api/users/address', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ address })
  })
  .then(res => res.json())
  .then(data => {
    addAddressToList(address);
    addressInput.value = '';
  })
  .catch(err => console.error(err));
}

function addAddressToList(address) {
  const addressList = document.getElementById('addressList');
  const li = document.createElement('li');
  li.textContent = address;
  addressList.appendChild(li);
}

function editProfile() {
  const newName = prompt('Enter new name:');
  const newEmail = prompt('Enter new email:');
  if (!newName || !newEmail) return;

  fetch('/api/users/me', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name: newName, email: newEmail })
  })
  .then(res => res.json())
  .then(user => {
    document.getElementById('userName').innerText = user.name;
    document.getElementById('userEmail').innerText = user.email;
    alert('Profile updated!');
  })
  .catch(err => console.error(err));
}

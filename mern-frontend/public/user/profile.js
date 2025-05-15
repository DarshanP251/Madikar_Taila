const apiUrl = '/api/users';
const token = localStorage.getItem('token'); // Assuming you saved token on login

if (!token) {
  alert('You are not logged in');
  window.location.href = '/login.html';
}

// Fetch user data
async function fetchProfile() {
  try {
    const res = await fetch(`${apiUrl}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const user = await res.json();

    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;

    loadAddresses(user.addresses || []);

  } catch (error) {
    console.error(error);
  }
}

// Fetch cart items
async function fetchCart() {
  try {
    const res = await fetch(`${apiUrl}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const cart = await res.json();

    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';
    cart.items.forEach(item => {
      const li = document.createElement('li');
      li.innerText = `${item.productId.name} x ${item.quantity}`;
      cartList.appendChild(li);
    });

  } catch (error) {
    console.error(error);
  }
}

// Fetch orders
async function fetchOrders() {
  try {
    const res = await fetch(`${apiUrl}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();

    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';
    data.orders.forEach(order => {
      const li = document.createElement('li');
      li.innerText = `Order ID: ${order._id} | Status: ${order.status || 'Pending'}`;
      orderList.appendChild(li);
    });

  } catch (error) {
    console.error(error);
  }
}

// Update Profile
document.getElementById('profileForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  const body = { name };
  if (password) {
    body.password = password;
  }

  try {
    await fetch(`${apiUrl}/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    alert('Profile updated successfully!');
    window.location.reload();

  } catch (error) {
    console.error(error);
    alert('Error updating profile');
  }
});

// Add Address
document.getElementById('addressForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const newAddress = document.getElementById('newAddress').value;

  try {
    await fetch(`${apiUrl}/address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ address: newAddress })
    });

    alert('Address added successfully!');
    window.location.reload();

  } catch (error) {
    console.error(error);
    alert('Error adding address');
  }
});

function loadAddresses(addresses) {
  const addressList = document.getElementById('addressList');
  addressList.innerHTML = '';
  addresses.forEach(addr => {
    const li = document.createElement('li');
    li.innerText = addr;
    addressList.appendChild(li);
  });
}

// Load everything
fetchProfile();
fetchCart();
fetchOrders();

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('adminToken'); // ✅ Corrected token key
  if (!token) {
    window.location.href = '/admin';
    return;
  }

  // Fetch products
  fetch('/api/admin/products', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(products => {
      const tableBody = document.querySelector('#product-table tbody');
      tableBody.innerHTML = '';
      products.forEach(p => {
        tableBody.innerHTML += `
          <tr>
            <td>${p.name}</td>
            <td>₹${p.price}</td>
            <td>${p.stock}</td>
            <td>
              <button onclick="deleteProduct('${p._id}')">Delete</button>
            </td>
          </tr>`;
      });
    })
    .catch(err => {
      console.error('❌ Failed to fetch products:', err);
      alert('Failed to load products. Please login again.');
      localStorage.removeItem('adminToken');
      window.location.href = '/admin';
    });

  // Fetch users
  fetch('/api/admin/users', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(users => {
      const list = document.querySelector('#user-list');
      list.innerHTML = users.map(u => `<li>${u.name} (${u.email})</li>`).join('');
    })
    .catch(err => {
      console.error('❌ Failed to fetch users:', err);
    });

  // Fetch orders
  fetch('/api/admin/orders', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(orders => {
      const list = document.querySelector('#order-list');
      list.innerHTML = orders.map(o => `<li>Order #${o._id} - ₹${o.total}</li>`).join('');
    })
    .catch(err => {
      console.error('❌ Failed to fetch orders:', err);
    });
});

// ✅ Delete product function with Authorization token
function deleteProduct(id) {
  const token = localStorage.getItem('adminToken');

  fetch(`/api/admin/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(() => location.reload())
  .catch(err => {
    console.error('❌ Failed to delete product:', err);
    alert('Failed to delete product.');
  });
}

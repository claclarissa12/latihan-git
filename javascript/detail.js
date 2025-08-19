// TAMPILKAN DETAIL PRODUK
document.addEventListener("DOMContentLoaded", async () => {
  const productId = localStorage.getItem("selectedProductId");

  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await response.json();

    document.getElementById("product-title").textContent = data.title;
    document.getElementById("product-price").textContent = `$${(data.price).toLocaleString("id-ID")}`;
    document.getElementById("product-rating").textContent = `⭐ ${data.rating}`;
    document.getElementById("product-image").src = data.thumbnail;
    document.getElementById("product-description").textContent = data.description;
    document.getElementById("product-brand").textContent = data.brand;
    document.getElementById("product-category").textContent = data.category;
    document.getElementById("product-stock").textContent = data.stock;

    // Tombol Tambah ke Keranjang
    document.getElementById("add-to-cart-btn").addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItem = cart.find(item => item.id === data.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: data.id,
          title: data.title,
          price: data.price,
          image: data.thumbnail,
          quantity: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      // Tampilkan alert tanpa redirect
      alert(`Produk "${data.title}" berhasil dimasukkan ke keranjang!`);
    });
  } catch (error) {
    console.error("Gagal memuat data produk:", error);
  }
});





function tambahUlasan() {
  const namaInput = document.getElementById('input-nama');
  const ulasanInput = document.getElementById('input-ulasan');
  const daftarUlasan = document.getElementById('daftar-ulasan');

  const nama = namaInput.value.trim();
  const ulasan = ulasanInput.value.trim();

 if (nama === '') {
  alert('Mohon isi nama terlebih dahulu.');
  return;
}

if (ulasan === '') {
  alert('Mohon isi ulasan terlebih dahulu.');
  return;
}

  const ulasanBaru = document.createElement('div');
  ulasanBaru.className = 'bg-[#FFEAF1] rounded-xl shadow p-6 border border-pink-200';

  ulasanBaru.innerHTML = `
    <div class="flex gap-4">
      <img src="https://i.pravatar.cc/50?u=${Date.now()}" alt="Avatar"
           class="rounded-full h-12 w-12 border-2 border-pink-300">
      <div class="flex-1">
        <div class="flex items-center justify-between mb-1">
          <div>
            <p class="font-bold text-pink-700 text-md">${nama}</p>
            <p class="text-xs text-gray-400">Baru saja</p>
          </div>
          <div class="text-yellow-400 text-md">⭐️⭐️⭐️⭐️⭐️</div>
        </div>
        <p class="text-gray-700 text-sm">“${ulasan}”</p>
      </div>
    </div>
  `;

  daftarUlasan.prepend(ulasanBaru);

  // Reset input
  namaInput.value = '';
  ulasanInput.value = '';
}

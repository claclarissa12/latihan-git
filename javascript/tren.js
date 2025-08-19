document.addEventListener("DOMContentLoaded", () => {
  ambilProduk("produk-tren", ["mens-watches", "sunglasses" , "womens-bags", "womens-watches","tops",
    "womens-dresses", "womens-shoes", "fragrances","beauty"
   ]);
});

async function ambilProduk(idContainer, kategoriTerpilih) {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=0");
    const data = await response.json();
    const semuaProduk = data.products;

    const produkTerpilih = semuaProduk
      .filter(p => kategoriTerpilih.includes(p.category))
      .slice(0, 100); // Maksimal 15 produk, bisa diubah

    tampilkanProduk(produkTerpilih, idContainer);
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    document.getElementById(idContainer).innerHTML = `
      <p class="text-red-600 text-center w-full">Gagal memuat produk.</p>
    `;
  }
}

function tampilkanProduk(produkList, idContainer) {
  const container = document.getElementById(idContainer);
  container.innerHTML = "";

  if (produkList.length === 0) {
    container.innerHTML = `
      <p class="text-gray-500 text-center w-full">Tidak ada produk tersedia.</p>
    `;
    return;
  }

  produkList.forEach(produk => {
    const kartu = document.createElement("div");
    kartu.className = `
      relative bg-white rounded-xl shadow-md px-6 py-10
      hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col
    `;

    kartu.innerHTML = `
      <span class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
        🔥 Hot Item
      </span>

      <img src="${produk.thumbnail}" alt="${produk.title}" class="w-full h-48 object-cover rounded-lg mb-3" />
      <div class="flex flex-col justify-between h-32">
        <h3 class="text-md font-semibold mb-1 min-h-[2.5rem]">${produk.title}</h3>
        <p class="text-sm text-gray-700 mb-1 min-h-[1.25rem]">⭐ ${produk.rating}</p>
        <div class="flex items-center justify-between">
          <p class="text-pink-600 font-bold text-xl">$${produk.price}</p>
          <img src="/dist/img/cart.png" alt="Cart"
               class="h-8 w-8 cursor-pointer add-to-cart rounded-lg" />
        </div>
      </div>
    `;

    kartu.addEventListener("click", e => {
      if (e.target.closest(".add-to-cart")) return;
      localStorage.setItem("selectedProductId", produk.id);
      window.location.href = "detail.html";
    });

    kartu.querySelector(".add-to-cart").addEventListener("click", e => {
      e.stopPropagation();
      tambahKeKeranjang(produk);
    });

    container.appendChild(kartu);
  });
}

function tambahKeKeranjang(produk) {
  let keranjang = JSON.parse(localStorage.getItem("cart")) || [];
  const ada = keranjang.find(item => item.id === produk.id);

  if (ada) {
    ada.quantity += 1;
  } else {
    keranjang.push({ ...produk, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(keranjang));
  alert(`"${produk.title}" ditambahkan ke keranjang!`);
}

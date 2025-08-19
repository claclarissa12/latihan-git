document.addEventListener("DOMContentLoaded", () => {
  ambilProduk();
});

async function ambilProduk() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=0");
    const data = await response.json();
    const semuaProduk = data.products;

    const kategoriTerpilih = ["womens-watches",  "sunglasses", ];
    const produkTerpilih = semuaProduk.filter(p => kategoriTerpilih.includes(p.category));

    tampilkanProduk(produkTerpilih);
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    document.getElementById("best-product").innerHTML = `
      <p class="text-red-600 text-center w-full">Gagal memuat produk.</p>
    `;
  }
}

function tampilkanProduk(produkList) {
  const container = document.getElementById("best-product");
  container.innerHTML = "";

  if (produkList.length === 0) {
    container.innerHTML = `
      <p class="text-gray-500 text-center w-full">Tidak ada produk best seller yang tersedia.</p>
    `;
    return;
  }

  produkList.forEach(produk => {
    const kartu = document.createElement("div");
    kartu.className = `
      relative flex-shrink-0 w-60 bg-white rounded-xl shadow-md px-6 py-10
      hover:shadow-lg transition-shadow duration-300 cursor-pointer
      flex flex-col
    `;

    kartu.innerHTML = `
      <!-- Badge HOT -->
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

    // Klik pada kartu (kecuali ikon keranjang)
    kartu.addEventListener("click", e => {
      if (e.target.closest(".add-to-cart")) return;
      localStorage.setItem("selectedProductId", produk.id);
      window.location.href = "detail.html";
    });

    // Klik ikon keranjang
    kartu.querySelector(".add-to-cart").addEventListener("click", e => {
      e.stopPropagation();  //digunakan agar klik ikon keranjang tidak memicu klik seluruh kartu.
      tambahKeKeranjang(produk);
    });

    container.appendChild(kartu);
  });
}

function tambahKeKeranjang(produk) {
  // Ambil keranjang dari localStorage, atau buat array baru jika belum ada
  let keranjang = JSON.parse(localStorage.getItem("cart")) || [];

  // Cek apakah produk sudah ada di keranjang
  let itemDitemukan = keranjang.find(item => item.id === produk.id);

  if (itemDitemukan) {
    // Jika sudah ada, tambahkan quantity-nya
    itemDitemukan.quantity++;
  } else {
    // Jika belum ada, tambahkan produk ke keranjang dengan quantity = 1
    produk.quantity = 1;
    keranjang.push(produk);
  }

  // Simpan kembali ke localStorage
  localStorage.setItem("cart", JSON.stringify(keranjang));

  // Tampilkan notifikasi
  alert(`"${produk.title}" ditambahkan ke keranjang!`);
}










// related
async function loadProducts() {
  const response = await fetch('https://dummyjson.com/products?limit=0'); // Ambil maksimal 100 produk
  const data = await response.json();
  const container = document.getElementById('product-all');
  const viewAllBtn = document.getElementById('view-all');

    // Ambil produk dari nomor 80 ke atas
  const products = data.products.slice(80);
  const initialLimit = 10;
  let showingAll = false;

  function renderProducts(limit) {
    container.innerHTML = ''; // Bersihkan container
    const visibleProducts = products.slice(0, limit);

    visibleProducts.forEach(product => {
      const card = document.createElement('div');
      card.className = "cursor-pointer w-64 bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300";

      card.innerHTML = `
         <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-70 object-cover rounded-lg mb-4">
         <div class="flex flex-col justify-between h-32">
            <h3 class="text-md font-semibold mb-1 min-h-[2.5rem]">${product.title}</h3>
            <p class="text-sm text-gray-700 mb-1 min-h-[1.25rem]">⭐ ${product.rating}</p>
            <div class="flex items-center justify-between">
              <p class="text-pink-600 font-bold text-xl">$${product.price}</p>
              <img src="/dist/img/cart.png" alt="Cart"
                   class="h-8 w-8 cursor-pointer add-to-cart rounded-lg" />
            </div>
         </div>
      `;

      // Navigasi ke detail saat card diklik
      card.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart")) return;

        localStorage.setItem("selectedProductId", product.id);
        window.location.href = "detail.html";
      });

      // Tambah ke keranjang
      card.querySelector('.add-to-cart').addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(product);
      });

      container.appendChild(card);
    });
  }

function tambahKeKeranjang(produk) {
  // Ambil data keranjang dari localStorage, jika tidak ada, buat array kosong
  let keranjang = JSON.parse(localStorage.getItem('cart')) || [];

  // Cek apakah produk sudah ada di keranjang
  let itemDitemukan = keranjang.find(item => item.id === produk.id);

  if (itemDitemukan) {
    // Jika produk sudah ada, tambahkan quantity-nya
    itemDitemukan.quantity += 1;
  } else {
    // Jika belum ada, tambahkan ke keranjang dengan quantity = 1
    produk.quantity = 1;
    keranjang.push(produk);
  }

  // Simpan kembali ke localStorage
  localStorage.setItem('cart', JSON.stringify(keranjang));

  // Tampilkan pesan berhasil
  alert(`"${produk.title}" ditambahkan ke keranjang.`);
}


  renderProducts(initialLimit); // Tampilkan awal 10 produk

  viewAllBtn.addEventListener("click", () => {   //dom manipulatin
    if (!showingAll) {
      renderProducts(products.length);
      viewAllBtn.style.display = "none";
      showingAll = true;
    }
  });
}

loadProducts();




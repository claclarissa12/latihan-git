document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("cart-items-container");
  const totalHargaEl = document.getElementById("selected-total");
  const selectAllCheckbox = document.getElementById("pilih-semua");
  const deleteSelectedBtn = document.getElementById("delete-selected");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function tampilkanKeranjang() {
    container.innerHTML = "";
    cart.forEach((item, i) => {
      item.quantity = item.quantity;
      const totalItem = item.price * item.quantity;

      const itemHTML = `
      <div class="flex justify-center mb-4 px-3">
        <div class="w-full max-w-7xl bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center gap-4">

          <!-- Gambar + Checkbox -->
          <div class="flex items-center gap-3">
            <input type="checkbox" class="item-checkbox w-5 h-5 shrink-0" data-index="${i}" checked>
            <img 
              src="${item.image || item.thumbnail}" 
              class="h-24 w-24 object-cover rounded-lg cursor-pointer" 
              onclick="lihatDetail(${item.id})"/>
          </div>

          <!-- Judul Produk -->
          <div 
            class="cursor-pointer text-center md:text-left md:flex-1 md:ml-4"
            onclick="lihatDetail(${item.id})">
            <p class="text-base md:text-lg font-semibold break-words">${item.title}</p>
          </div>

          <!-- Kuantitas, Total & Hapus -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-12 w-full md:w-auto text-center md:text-right">
            
            <!-- Kontrol Kuantitas -->
            <div class="flex items-center justify-center gap-2">
              <button class="qty-btn bg-[#EC7FA9] text-white px-3 py-1 rounded text-sm" data-action="minus" data-index="${i}">-</button>
              <span id="qty-${i}" class="text-base">${item.quantity}</span>
              <button class="qty-btn bg-[#BE5985] text-white px-3 py-1 rounded text-sm" data-action="plus" data-index="${i}">+</button>
            </div>

            <!-- Total Harga -->
            <p class="text-lg font-bold item-total text-pink-600" id="total-${i}">$. ${totalItem.toLocaleString()}</p>

            <!-- Tombol Hapus -->
            <button 
              onclick="hapusItem(${i})" 
              class="bg-[#EC7FA9] text-white px-4 py-2 rounded text-sm hover:bg-pink-500 transition">
              Hapus
            </button>
          </div>

        </div>
      </div>
        `;

      container.insertAdjacentHTML("beforeend", itemHTML);
    });

    hitungTotal();
    pasangEvent();
    window.lihatDetail = function (id) {
    localStorage.setItem("selectedProductId", id);
    window.location.href = "detail.html";
};

  }

  // Fitur checkbox "Pilih Semua"
  selectAllCheckbox.addEventListener("change", function () {
    const checked = selectAllCheckbox.checked;
    document.querySelectorAll(".item-checkbox").forEach(cb => {
      cb.checked = checked;
    });
    hitungTotal();
    toggleDeleteButton();
  });

  // Cek aktif atau tidaknya tombol delete
  function toggleDeleteButton() {
    const anyChecked = document.querySelectorAll(".item-checkbox:checked").length > 0;
    deleteSelectedBtn.disabled = !anyChecked;
    deleteSelectedBtn.classList.toggle("opacity-50", !anyChecked);
    deleteSelectedBtn.classList.toggle("cursor-not-allowed", !anyChecked);
  }

  // Event tombol checkbox dan quantity
  function pasangEvent() {
    document.querySelectorAll(".item-checkbox").forEach(cb => {
      cb.addEventListener("change", () => {
        hitungTotal();
        toggleDeleteButton();
      });
    });

    document.querySelectorAll(".qty-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const i = this.dataset.index;
        if (this.dataset.action === "plus") {
          cart[i].quantity++;
        } else {
          if (cart[i].quantity > 1) cart[i].quantity--;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        tampilkanKeranjang();
      });
    });
  }

  
// Fungsi untuk menghitung total harga semua item yang dicentang
function hitungTotal() {
  let total = 0; // Awalnya total = 0

  // Loop semua checkbox yang dicentang saja
  document.querySelectorAll(".item-checkbox:checked").forEach(cb => {
    const i = cb.dataset.index; // Ambil index dari produk
    const item = cart[i]; // Ambil data produk dari array cart
    total += item.price * item.quantity; // Tambah total: harga x jumlah
  });

  // Tampilkan total ke elemen HTML dalam format uang
  totalHargaEl.textContent = `$. ${total.toLocaleString()}`;
}


// Fungsi untuk menghapus satu item dari keranjang berdasarkan index
window.hapusItem = function (index) {
  // Tampilkan dialog konfirmasi ke pengguna
  const yakin = confirm("Yakin ingin menghapus produk ini?"); // Menanyakan apakah pengguna yakin ingin menghapus produk
  
  if (!yakin) return; // Jika pengguna menekan 'Batal', maka fungsi berhenti dan tidak melakukan apa-apa

  cart.splice(index, 1); // Menghapus item dari array `cart` berdasarkan indeks yang diberikan

  localStorage.setItem("cart", JSON.stringify(cart)); // Menyimpan ulang array `cart` ke dalam localStorage setelah diubah

  tampilkanKeranjang(); // Memanggil fungsi untuk me-refresh tampilan keranjang setelah data dihapus
};


// Fungsi untuk menghapus item yang dicentang di keranjang
window.confirmClearCart = function () {
  // Mengecek apakah ada checkbox item yang dicentang
  const anyChecked = document.querySelectorAll(".item-checkbox:checked").length > 0;

  // Jika tidak ada yang dicentang, tampilkan peringatan dan keluar dari fungsi
  if (!anyChecked) {
    alert("Tidak ada produk yang dipilih untuk dihapus."); // Memberi tahu pengguna bahwa tidak ada produk yang dipilih
    return; // Menghentikan eksekusi fungsi
  }

  // Menampilkan konfirmasi kepada pengguna sebelum menghapus data
  const yakin = confirm("Yakin ingin menghapus semua produk yang dipilih?");
  if (!yakin) return; // Jika pengguna memilih 'Batal', keluar dari fungsi

  // Menghapus seluruh data yang ada di localStorage, termasuk 'cart', 'username', dan data lain
  localStorage.clear(); // ⚠️ Ini akan menghapus semua key yang tersimpan di localStorage

  // Mengosongkan array cart di memori (RAM/browser)
  cart = [];

  // Memuat ulang isi keranjang agar tampilannya diperbarui sesuai kondisi terbaru
  tampilkanKeranjang();
};



// Fungsi untuk checkout item yang dicentang
window.checkoutSelected = function () {
  // Cek semua checkbox yang dicentang
  const selectedCheckboxes = document.querySelectorAll(".item-checkbox:checked");

  // Jika tidak ada yang dicentang
  if (selectedCheckboxes.length === 0) {
    alert("Pilih minimal 1 produk untuk checkout."); // Tampilkan pesan jika tidak ada yang dipilih
    return; // Hentikan proses
  }

  alert(`Checkout akan dilakukan untuk ${selectedCheckboxes.length} item.`); // Beri tahu jumlah item yang dicheckout
  window.location.href = "forms.html"; // Arahkan ke halaman form untuk proses checkout
};


  tampilkanKeranjang();
});

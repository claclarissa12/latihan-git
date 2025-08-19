
// scoroll x



// 
const container = document.getElementById("product-detail");
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    data.products.forEach(product => {
      const card = document.createElement("div");
      card.className = `
        border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm
        flex flex-col items-center p-4 w-full sm:w-[270px]
        transition-transform hover:-translate-y-1 duration-300
      `;

      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}"
             class="w-5/6 h-[180px] object-cover rounded-md mb-4" />

        <div class="w-full px-2">
          <p class="font-bold text-base mb-1 text-gray-900">
            $${product.price.toLocaleString('id-ID')}
          </p>
          <p class="text-sm text-gray-600 truncate mb-3">${product.title}</p>
        </div>

        <div class="flex items-center justify-between w-full px-2">
          <div class="text-yellow-400 text-sm">
            ${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))}
          </div>
          <img src="/dist/img/shopping.png" alt="cart"
               class="h-8 w-8 rounded-full cursor-pointer" />
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error(err);
  });

 







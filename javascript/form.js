  document.addEventListener("DOMContentLoaded", function () {
    const checkoutBtn = document.querySelector("button.w-full");
    
    checkoutBtn.addEventListener("click", function () {
        alert("Checkout berhasil dilakukan. Terima kasih telah berbelanja!");
        window.location.href ="checkout.html";
    });
  });
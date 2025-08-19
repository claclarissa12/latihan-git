// regis
 document.getElementById('registerForm').addEventListener('submit', e => {
      e.preventDefault();
      const mail = contact.value.trim(), user = username.value.trim(), pass = password.value.trim(), msg = errorMsg;
      if (!mail || !user || !pass) msg.classList.remove('hidden');
      else {
        msg.classList.add('hidden');
        location.href = 'homepage.html';
      }
    });
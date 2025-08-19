  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const msg = document.getElementById('errorMsg');
    if (!user || !pass) msg.classList.remove('hidden');
    else {
      msg.classList.add('hidden');
      location.href = 'homepage.html';
    }
  });
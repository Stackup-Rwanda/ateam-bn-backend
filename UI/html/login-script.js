/* eslint-disable no-undef */
const socket = io();

const loginForm = document.getElementById('form');
const responseContainer = document.querySelector(".response");
const emailInput = document.querySelector(".emailInput");
const passwordInput = document.querySelector(".passwordInput");

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const loginBody = {
    email: emailInput.value,
    password: passwordInput.value
  };

  fetch(`${socket.io.uri}/api/auth/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginBody)
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 401) {
        responseContainer.classList.add('show-me');
        responseContainer.innerHTML = res.message;
      } else window.location.href = `${socket.io.uri}/api/barefoot-chat`;

      const { userData, token } = res.data;
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('token', token);
    })
    .catch((err) => err);
});

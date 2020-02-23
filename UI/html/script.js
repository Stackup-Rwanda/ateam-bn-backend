/* eslint-disable no-undef */
const socket = io();

const token = localStorage.getItem('token');
if (!token) window.location.href = `${socket.io.uri}/api/barefoot-login`;

let senderData = localStorage.getItem('userData');
senderData = JSON.parse(senderData);

const messageContainer = document.querySelector(".message-container");
const messageForm = document.querySelector(".form");
const messageInput = document.querySelector(".message-input");

const displayMessage = (data) => {
  const div = document.createElement('div');
  div.classList.add('container');

  if (data.userId === senderData.id) {
    div.classList.add('darker');
    div.innerHTML += `
    <p class="logo">Me</p>
    <p>${data.message}</p>
    <span class="time-left">${data.createdAt}</span>
    `;
  } else {
    div.innerHTML += `
    <p class="logo">${data.Users.role}: ${data.Users.name}</p>
    <p>${data.message}</p>
    <span class="time-right">${data.createdAt}</span>
    `;
  }
  messageContainer.appendChild(div);
};

fetch(`${socket.io.uri}/api/chats`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    token
  },
})
  .then((res) => res.json())
  .then((res) => {
    const chats = res.data;
    chats.forEach((data) => {
      displayMessage(data);
    });
  })
  .catch((err) => err);

socket.on('server-chat-message', (data) => {
  displayMessage(data);
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = messageInput.value;
  const createdAt = new Date();

  displayMessage({
    userId: senderData.id,
    message,
    createdAt,
    Users: {
      name: senderData.name,
      role: senderData.role
    }
  });

  socket.emit('client-chat-message', {
    userId: senderData.id,
    message,
    createdAt,
    Users: {
      name: senderData.name,
      role: senderData.role
    }
  });

  messageInput.value = '';
});

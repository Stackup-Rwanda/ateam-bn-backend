const up = (queryInterface) => queryInterface.bulkInsert('Tokens', [
  {
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQnV0aXJpZ2l0d2EgTWFuemkiLCJ1c2VybmFtZSI6Im1hbnppIiwiZW1haWwiOiJtYW56aUBnbWFpbC5jb20iLCJpYXQiOjE1ODA4MjA1MTZ9.jPcc3YOJCGZaq-3Y-hQNQG_VlzijnocglCg5b0twHYA',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltbXkgS2F5a2F5IiwidXNlcm5hbWUiOiJrYXkiLCJlbWFpbCI6IkprYXlAZ21haWwuY29tIiwiaWF0IjoxNTgwODIwNjAwfQ.GugiqBFSyVbZqt7X4b19Abu6mXlJDTU3RyXTtepNNuY',
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
const down = (queryInterface) => queryInterface.bulkDelete('Tokens', null, {});

export {
  up,
  down
};

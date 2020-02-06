const up = (queryInterface) => queryInterface.bulkInsert('Tokens', [
  {
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQnV0aXJpZ2l0d2EgTWFuemkiLCJ1c2VybmFtZSI6Im1hbnppIiwiZW1haWwiOiJtYW56aUBnbWFpbC5jb20iLCJpYXQiOjE1ODA4MjA1MTZ9.jPcc3YOJCGZaq-3Y-hQNQG_VlzijnocglCg5b0twHYA',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJkdW1teTJAZW1haWwucnciLCJyb2xlIjoiU3VwZXIgQWRtaW5pc3RyYXRvciIsImlhdCI6MTU4MDk1NzUwNH0.iOPzeyAUNCawgWmMfV9KCAbdAIpLdqHP8e9xVxZv6kA',
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
const down = (queryInterface) => queryInterface.bulkDelete('Tokens', null, {});
https://github.com/Stackup-Rwanda/ateam-bn-backend/pull/28/conflict?name=seeders%252F20200204194541-demo-token.js&base_oid=99fc04fff71bda8fae1d47e9d2a6a286182f3535&head_oid=177c4d20fbd05bf3fd0a322e69d47bb942d130ca
export {
  up,
  down
};

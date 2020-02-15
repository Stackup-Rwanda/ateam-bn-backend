const up = (queryInterface) => queryInterface.bulkInsert('Tokens', [
  {
    value:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQnV0aXJpZ2l0d2EgTWFuemkiLCJ1c2VybmFtZSI6Im1hbnppIiwiZW1haWwiOiJtYW56aUBnbWFpbC5jb20iLCJpYXQiOjE1ODA4MjA1MTZ9.jPcc3YOJCGZaq-3Y-hQNQG_VlzijnocglCg5b0twHYA',
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    value:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJkdW1teTJAZW1haWwucnciLCJyb2xlIjoiU3VwZXIgQWRtaW5pc3RyYXRvciIsImlhdCI6MTU4MDk1NzUwNH0.iOPzeyAUNCawgWmMfV9KCAbdAIpLdqHP8e9xVxZv6kA',
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    value:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJNckR1bW15MyIsImVtYWlsIjoiZHVtbXkzQGVtYWlsLnJ3Iiwicm9sZSI6IlRyYXZlbCBBZG1pbmlzdHJhdG9yIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNTgxNTE4ODMxfQ.TXaSaJW7d5ckEHbVzA2OQlMwT8jbDqX01KE5x0rvVXc',
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    value:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJNckR1bW15NCIsImVtYWlsIjoiay5qb3NodWE4NTVAZ21haWwuY29tIiwicm9sZSI6IlRyYXZlbCBBZG1pbmlzdHJhdG9yIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNTgxNzc2MzA2fQ.vCEPcRQUARyx6zvazef2-1VXmOYLj10o_ktYQLX4UAQ',
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
const down = (queryInterface) => queryInterface.bulkDelete('Tokens', null, {});

export {
  up,
  down
};

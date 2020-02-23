const up = (queryInterface) => queryInterface.bulkInsert('Chats', [{
  userId: 6,
  message: 'Welcome!',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Chats', null, {});

export {
  up,
  down
};

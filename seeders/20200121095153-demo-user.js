const up = (queryInterface) => queryInterface.bulkInsert('Users', [{
  firstName: 'Dummy',
  lastName: 'User',
  email: 'dummyuser@gmail.com',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

export {
  up,
  down
};

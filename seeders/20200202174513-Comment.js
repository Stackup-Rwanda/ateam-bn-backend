const up = (queryInterface) => queryInterface.bulkInsert('Comments', [{
  userId: 1,
  tripId: 1,
  comment: 'First Comment',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Comments', null, {});

export {
  up,
  down
};

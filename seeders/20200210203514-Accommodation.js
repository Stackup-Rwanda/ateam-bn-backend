const up = (queryInterface) => queryInterface.bulkInsert('Accommodation', [{
  name: 'Your hoter',
  placeId: 2,
  type: 'house',
  price: '2000USD',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Accommodation', null, {});

export {
  up,
  down
};

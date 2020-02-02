const up = (queryInterface) => queryInterface.bulkInsert('Trips', [{
  userId: 1,
  tripType: 'One-way',
  from: 'kigali',
  to: 'new york',
  date: new Date(),
  reasons: 'being a mannager',
  accommodation: '3000USD',
  status: 'approved',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Trips', null, {});

export {
  up,
  down
};

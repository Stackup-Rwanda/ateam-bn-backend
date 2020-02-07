const up = (queryInterface) => queryInterface.bulkInsert('Trips', [{
  userId: 1,
  tripType: 'One-way',
  from: 'kigali',
  to: 'new york',
  date: new Date(),
  returnDate: null,
  reasons: 'being a mannager',
  accommodationId: 1,
  status: 'pending',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Trips', null, {});

export {
  up,
  down
};

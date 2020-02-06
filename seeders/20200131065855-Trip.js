const up = (queryInterface) => queryInterface.bulkInsert('trips', [{
  userId: 1,
  tripType: 'One-way',
  from: 'kigali',
  to: 'new york',
  date: new Date(),
  returnDate: null,
  reasons: 'being a mannager',
  accommodationId: 1,
  status: 'approved',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('trips', null, {});

export {
  up,
  down
};

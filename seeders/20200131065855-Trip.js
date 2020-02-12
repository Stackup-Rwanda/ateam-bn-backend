const up = (queryInterface) => queryInterface.bulkInsert('Trips', [{
  userId: 1,
  name: 'john',
  gender: 'male',
  birthdate: '2020-05-04',
  tripType: 'One-way',
  from: 1,
  to: 2,
  date: new Date(),
  returnDate: null,
  reasons: 'being a mannager',
  accommodationId: 1,
  status: 'Pending',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Trips', null, {});

export {
  up,
  down
};

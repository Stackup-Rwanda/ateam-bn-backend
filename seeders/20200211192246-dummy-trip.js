const up = (queryInterface) => queryInterface.bulkInsert('Trips', [
  { 
    userId: 1,
    tripType: 'Two-Way',
    from: 3,
    to: 1,
    date: new Date(),
    returnDate: null,
    reasons: 'Job affairs',
    status: 'Pending',
    comment: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

const down = (queryInterface) => queryInterface.bulkDelete('Trips', null, {});

export {
  up,
  down
};

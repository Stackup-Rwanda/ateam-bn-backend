const up = (queryInterface) => queryInterface.bulkInsert('Trips', [
  {
    userId: 1,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'being a mannager',
    accommodationId: 1,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'being a mannager',
    accommodationId: 1,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'being a mannager',
    accommodationId: 1,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'being a mannager',
    accommodationId: 1,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'being a mannager',
    accommodationId: 1,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'being a mannager',
    accommodationId: 1,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'being a mannager',
    accommodationId: 1,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 8,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'Jaja dummy data, plz do not delete this',
    accommodationId: 1,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

const down = (queryInterface) => queryInterface.bulkDelete('Trips', null, {});

export {
  up,
  down
};

const up = (queryInterface) => queryInterface.bulkInsert('Trips', [
  {
    name: 'john',
    passportId: 'PC234567',
    userId: 1,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'being a mannager',
    accommodationId: 3,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'john',
    passportId: 'PC234567',
    userId: 2,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'visiting hawai',
    accommodationId: 2,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'paul',
    passportId: 'PC234567',
    userId: 1,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'being a mannager',
    accommodationId: 1,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'john',
    passportId: 'PC234567',
    userId: 4,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'being a mannager',
    accommodationId: 1,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'john',
    passportId: 'PC234567',
    userId: 1,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'being a mannager',
    accommodationId: 4,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'john',
    passportId: 'PC234567',
    userId: 2,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: '2020-02-21',
    returnDate: null,
    reasons: 'being a mannager',
    accommodationId: 2,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'john',
    passportId: 'PC234567',
    userId: 2,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'being a mannager',
    accommodationId: 3,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'john',
    passportId: 'PC234567',
    userId: 3,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'visiting hawai',
    accommodationId: 1,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'john',
    passportId: 'PC234567',
    userId: 8,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'Jaja dummy data, plz do not delete this',
    accommodationId: 3,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    tripType: 'Two-way',
    from: 1,
    to: [2, 3],
    date: new Date(),
    returnDate: null,
    reasons: 'I want to rate accommodation one',
    accommodationId: 5,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    tripType: 'Two-way',
    from: 1,
    to: [2, 3],
    date: new Date(),
    returnDate: null,
    reasons: 'I want to rate accommodation one',
    accommodationId: 3,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    tripType: 'Two-way',
    from: 1,
    to: [2, 3],
    date: new Date(),
    returnDate: null,
    reasons: 'I want to rate accommodation one',
    accommodationId: 1,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    tripType: 'Two-way',
    from: 1,
    to: [2, 3],
    date: new Date(),
    returnDate: null,
    reasons: 'I want to rate accommodation one',
    accommodationId: 5,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    tripType: 'Two-way',
    from: 1,
    to: [2, 3],
    date: new Date(),
    returnDate: null,
    reasons: 'I want to rate accommodation one',
    accommodationId: 6,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'john',
    passportId: 'PC234567',
    userId: 8,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'Jaja dummy data, plz do not delete',
    accommodationId: 3,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'john',
    passportId: 'PC234567',
    userId: 8,
    tripType: 'One-way',
    from: 1,
    to: [2, 1],
    date: new Date(),
    returnDate: null,
    reasons: 'Jaja dummy data, plz',
    accommodationId: 4,
    status: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

const down = (queryInterface) => queryInterface.bulkDelete('Trips', null, {});

export {
  up,
  down
};

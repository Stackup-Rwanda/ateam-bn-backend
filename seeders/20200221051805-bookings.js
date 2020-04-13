const up = (queryInterface) => queryInterface.bulkInsert('Bookings', [{
  roomId: 1,
  tripId: 1,
  bookedBy: 1,
  from: new Date(),
  to: '2020-05-26',
  createdAt: new Date(),
  updatedAt: new Date(),
}, {
  roomId: 1,
  tripId: 2,
  bookedBy: 1,
  from: new Date(),
  to: '2020-05-26',
  createdAt: new Date(),
  updatedAt: new Date()
}
]);

const down = (queryInterface) => queryInterface.bulkDelete('bookings', null, {});

export {
  up,
  down
};

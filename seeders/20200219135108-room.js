const up = (queryInterface) => queryInterface.bulkInsert('Rooms', [{
  accommodationId: 1,
  roomType: 'A room with a king-sized bed',
  amenities: ['breakfast , cleaning and loundry,TV and internet are provided '],
  cost: '500 000 Rwfr',
  image: '/images/myfile.jpg',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  accommodationId: 2,
  roomType: ' A room with a queen-sized bed. ',
  amenities: ['breakfast , cleaning and loundry, TV and internet are provided'],
  cost: '500 000 Rwfr',
  image: '/images/myfile.jpg',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  accommodationId: 2,
  roomType: ' A room with two beds',
  amenities: ['breakfast , cleaning and loundry'],
  cost: '400 000 Rwfr',
  image: '/images/myfile.jpg',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  accommodationId: 2,
  roomType: ' A room with two beds',
  amenities: ['breakfast , cleaning and loundry'],
  cost: '400 000 Rwfr',
  image: '/images/myfile.jpg',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  accommodationId: 2,
  roomType: ' A room with two beds',
  amenities: ['breakfast , cleaning and loundry'],
  cost: '400 000 Rwfr',
  image: '/images/myfile.jpg',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Rooms', null, {});

export {
  up,
  down
};

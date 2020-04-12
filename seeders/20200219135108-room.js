const up = (queryInterface) => queryInterface.bulkInsert('Rooms', [{
  accommodationId: 3,
  roomType: 'Suites',
  amenities: ['breakfast , cleaning and loundry,TV and internet are provided '],
  cost: '500 000 Rwfr',
  image: '/images/myfile.jpg',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  accommodationId: 4,
  roomType: ' King-size ',
  amenities: ['breakfast , cleaning and loundry, TV and internet are provided'],
  cost: '500 000 Rwfr',
  image: '/images/myfile.jpg',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  accommodationId: 1,
  roomType: 'Single',
  amenities: ['breakfast , cleaning and loundry'],
  cost: '400 000 Rwfr',
  image: '/images/myfile.jpg',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  accommodationId: 2,
  roomType: 'Double',
  amenities: ['breakfast , cleaning and loundry'],
  cost: '400 000 Rwfr',
  image: '/images/myfile.jpg',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  accommodationId: 5,
  roomType: ' Double',
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

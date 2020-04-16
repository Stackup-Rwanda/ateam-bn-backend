const up = (queryInterface) => queryInterface.bulkInsert('Rooms', [{
  accommodationId: 3,
  roomType: 'Suites',
  amenities: ['breakfast , cleaning and loundry,TV and internet are provided '],
  cost: '500 000 Rwfr',
  image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  accommodationId: 4,
  roomType: 'King-size',
  amenities: ['breakfast , cleaning and loundry, TV and internet are provided'],
  cost: '500 000 Rwfr',
  image: 'https://images.unsplash.com/photo-1576675784432-994941412b3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  accommodationId: 1,
  roomType: 'Single',
  amenities: ['breakfast , cleaning and loundry'],
  cost: '400 000 Rwfr',
  image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  accommodationId: 3,
  roomType: 'Queen-size',
  amenities: ['breakfast , cleaning and loundry'],
  cost: '400 000 Rwfr',
  image: 'https://images.unsplash.com/photo-1560185128-e173042f79dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=699&q=80',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  accommodationId: 2,
  roomType: 'King-size',
  amenities: ['breakfast , cleaning and loundry'],
  cost: '400 000 Rwfr',
  image: 'https://images.unsplash.com/photo-1560185893-d9680d601385?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  accommodationId: 1,
  roomType: 'Suites',
  amenities: ['breakfast , cleaning and loundry'],
  cost: '400 000 Rwfr',
  image: 'https://images.unsplash.com/photo-1533633310920-cc9bf1e7f9b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  accommodationId: 2,
  roomType: 'Double',
  amenities: ['breakfast , cleaning and loundry'],
  cost: '400 000 Rwfr',
  image: 'https://images.unsplash.com/photo-1572987669554-0ba2ba9aee1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  accommodationId: 5,
  roomType: 'Queen-size',
  amenities: ['breakfast , cleaning and loundry'],
  cost: '400 000 Rwfr',
  image: 'https://images.unsplash.com/photo-1574873215043-44119461cb3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Rooms', null, {});

export {
  up,
  down
};

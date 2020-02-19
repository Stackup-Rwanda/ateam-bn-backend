const up = (queryInterface) => queryInterface.bulkInsert('Accommodations', [{
  name: 'Your hotel',
  description: 'we can have you any time',
  image: '/images/myfile.jpg',
  locationId: 1,
  geoLocation: '-1.9450485, 30.089976',
  space: 'House',
  cost: '300USD',
  highlights: '2 bed room , salon',
  amenities: 'hey hey',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  name: 'Isimbi Hotel',
  description: 'we can have you any time',
  image: '/images/myfile.jpg',
  locationId: 1,
  geoLocation: '-0.9450485, 32.089976',
  space: 'Houses',
  cost: '500USD',
  highlights: '2 bed room , salon',
  amenities: 'hey hey',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  name: 'Radison Blue Hotel',
  description: 'we can have you any time',
  image: '/images/myfile.jpg',
  locationId: 1,
  geoLocation: '-0.9450485, 32.089976',
  space: 'Houses',
  cost: '500USD',
  highlights: '2 bed room , salon',
  amenities: 'hey hey',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  name: 'Mille Collines Hotel',
  description: 'we can have you any time',
  image: '/images/myfile.jpg',
  locationId: 1,
  geoLocation: '-0.9450485, 32.089976',
  space: 'Houses',
  cost: '500USD',
  highlights: '2 bed room , salon',
  amenities: 'hey hey',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  name: 'Karisimbi Hotel',
  description: 'we can have you any time',
  image: '/images/myfile.jpg',
  locationId: 1,
  geoLocation: '-0.9450485, 32.089976',
  space: 'Houses',
  cost: '500USD',
  highlights: '2 bed room , salon',
  amenities: 'hey hey',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Accommodations', null, {});

export {
  up,
  down
};

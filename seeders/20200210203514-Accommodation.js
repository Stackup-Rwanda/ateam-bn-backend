const up = (queryInterface) => queryInterface.bulkInsert('Accommodations', [{
  name: 'Your hoter',
  description: 'we can have you any time',
  image: '/images/myfile.jpg',
  locationId: 2,
  geoLocation: '-1.9450485, 30.089976',
  space: 'House',
  cost: '300USD',
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

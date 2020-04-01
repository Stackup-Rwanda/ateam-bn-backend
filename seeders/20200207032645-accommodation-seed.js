const up = (queryInterface) => queryInterface.bulkInsert('Accommodations', [
  {
    createdBy: 4,
    name: 'Karen Hotel',
    description: 'Only goats are accepted here',
    image: 'https://media-cdn.tripadvisor.com/media/photo-m/1280/13/fd/0e/a9/double-room-with-extra.jpg',
    locationId: 1,
    geoLocation: '31.0349523, 34.2346914',
    highlights: 'The President of Rwanda His Excellence Paul Kagame has launched the Karen Hotel',
    amenities: ['5 star hotel with swimming pool and gym', 'And yes we have the best kitchen'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    createdBy: 4,
    name: 'Legacy Hotel',
    description: 'Only goats are accepted here',
    image: 'https://r-cf.bstatic.com/images/hotel/max1280x900/954/95408203.jpg',
    locationId: 1,
    geoLocation: '31.0349523, 34.2346914',
    highlights: 'The President of Rwanda His Excellence Paul Kagame has launched the Karen Hotel',
    amenities: ['5 star hotel with swimming pool and gym', 'And yes we have the best kitchen'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    createdBy: 4,
    name: 'Serana Hotel',
    description: 'Only goats are accepted here',
    image: 'https://nannycay.com/wp-content/uploads/2019/02/nanny-cay-february-2019-update-13-2-1024x683.jpg',
    locationId: 1,
    geoLocation: '31.0349523, 34.2346914',
    highlights: 'The President of Rwanda His Excellence Paul Kagame has launched the Karen Hotel',
    amenities: ['5 star hotel with swimming pool and gym', 'And yes we have the best kitchen'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    createdBy: 4,
    name: 'Arena Hotel',
    description: 'Only goats are accepted here',
    image: 'https://mcdn.wallpapersafari.com/medium/91/83/jECzOG.jpg',
    locationId: 1,
    geoLocation: '31.0349523, 34.2346914',
    highlights: 'The President of Rwanda His Excellence Paul Kagame has launched the Karen Hotel',
    amenities: ['5 star hotel with swimming pool and gym', 'And yes we have the best kitchen'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

const down = (queryInterface) => queryInterface.bulkDelete('Accommodations', null, {});

export {
  up,
  down
};

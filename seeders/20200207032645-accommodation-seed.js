const up = (queryInterface) => queryInterface.bulkInsert('Accommodations', [
  {
    createdBy: 4,
    name: 'Karen Hotel',
    description: 'Only goats are accepted here',
    image: 'https://mcdn.wallpapersafari.com/medium/38/12/I8saGn.jpg',
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
    image: 'https://mcdn.wallpapersafari.com/medium/57/33/UW0jhS.jpg',
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
    image: 'https://mcdn.wallpapersafari.com/medium/40/15/fmFJbU.jpg',
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

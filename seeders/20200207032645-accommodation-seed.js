const up = (queryInterface) => queryInterface.bulkInsert('Accommodations', [
  {
    createdBy: 4,
    name: 'Karen Hotel',
    description: 'Only goats are accepted here',
    image: 'no image',
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

const up = (queryInterface) => queryInterface.bulkInsert('Accommodations', [
  {
    name: 'Karen Hotel',
    description: 'Only goats are accepted here',
    image: 'no image',
    locationId: 3,
    geoLocation: '31.0349523, 34.2346914',
    space: '5 rooms available',
    cost: '200.000 frw',
    highlights: 'The President of Rwanda His Excellence Paul Kagame has launched the Karen Hotel',
    amenities: '5 star hotel with swimming pool and gym',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

const down = (queryInterface) => queryInterface.bulkDelete('Accommodations', null, {});

export {
  up,
  down
};

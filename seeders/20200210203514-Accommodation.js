const up = (queryInterface) => queryInterface.bulkInsert('Accommodations', [
  {
    createdBy: 4,
    name: 'Your hotel',
    description: 'we can have you any time',
    image: 'https://mcdn.wallpapersafari.com/medium/57/33/UW0jhS.jpg',
    locationId: 1,
    geoLocation: '-1.9450485, 30.089976',
    highlights: '2 bed room , salon',
    amenities: ['hey hey', 'You will enjoy'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    createdBy: 4,
    name: 'Isimbi Hotel',
    description: 'we can have you any time',
    image: 'https://mcdn.wallpapersafari.com/medium/40/15/fmFJbU.jpg',
    locationId: 1,
    geoLocation: '-0.9450485, 32.089976',
    highlights: '2 bed room , salon',
    amenities: ['hey hey', 'You will enjoy'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    createdBy: 4,
    name: 'Radison Blue Hotel',
    description: 'we can have you any time',
    image: 'https://mcdn.wallpapersafari.com/medium/91/83/jECzOG.jpg',
    locationId: 1,
    geoLocation: '-0.9450485, 32.089976',
    highlights: '2 bed room , salon',
    amenities: ['hey hey', 'You will enjoy'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    createdBy: 4,
    name: 'Mille Collines Hotel',
    description: 'we can have you any time',
    image: 'https://mcdn.wallpapersafari.com/medium/70/21/hC48gm.jpg',
    locationId: 1,
    geoLocation: '-0.9450485, 32.089976',
    highlights: '2 bed room , salon',
    amenities: ['hey hey', 'You will enjoy'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    createdBy: 4,
    name: 'Karisimbi Hotel',
    description: 'we can have you any time',
    image: 'https://mcdn.wallpapersafari.com/medium/38/12/I8saGn.jpg',
    locationId: 1,
    geoLocation: '-0.9450485, 32.089976',
    highlights: '2 bed room , salon',
    amenities: ['hey hey', 'You will enjoy'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

const down = (queryInterface) => queryInterface.bulkDelete('Accommodations', null, {});

export {
  up,
  down
};

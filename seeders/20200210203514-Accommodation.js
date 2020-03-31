const up = (queryInterface) => queryInterface.bulkInsert('Accommodations', [
  {
    createdBy: 4,
    name: 'Your hotel',
    description: 'we can have you any time',
    image: 'https://media-cdn.tripadvisor.com/media/photo-m/1280/13/fd/0e/a9/double-room-with-extra.jpg',
    locationId: 3,
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
    image: 'https://r-cf.bstatic.com/images/hotel/max1280x900/954/95408203.jpg',
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
    image: 'https://nannycay.com/wp-content/uploads/2019/02/nanny-cay-february-2019-update-13-2-1024x683.jpg',
    locationId: 3,
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
    name: 'Karisimbi Hotel',
    description: 'we can have you any time',
    image: 'https://www.porcelanosa.com/trendbook/app/uploads/2019/05/Hotel-Naisa-Porcelanosa-2.jpg',
    locationId: 2,
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

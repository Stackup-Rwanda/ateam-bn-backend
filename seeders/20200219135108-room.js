const up = (queryInterface) => queryInterface.bulkInsert('Rooms', [{
  accommodationId: 1,
  description: 'birthroom with jacuz, all services are provided',
  image: '/images/myfile.jpg',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  accommodationId: 2,
  description: 'one person bed and birthroom with no jacuz',
  image: '/images/myfile.jpg',
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  accommodationId: 2,
  description: 'dooble bed and birthroom with no jacuzd, wordrobe available',
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

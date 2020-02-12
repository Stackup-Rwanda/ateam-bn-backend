const up = (queryInterface) => queryInterface.bulkInsert('Users', [{
  name: 'Butirigitwa Manzi',
  username: 'manzi',
  email: 'manzi@gmail.com',
  gender: 'MALE',
  lineManager: 'Runyamahe',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

module.exports = {
  up,
  down
};

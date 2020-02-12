const up = (queryInterface) => queryInterface.bulkInsert('Users', [{
  name: 'Jimmy Kaykay',
  username: 'kay',
  email: 'Jkay@gmail.com',
  role: 'Manager',
  gender: 'MALE',
<<<<<<< HEAD
  lineManager: 3,
=======
  lineManager: 'Runyamahe',
>>>>>>> ft(locations-accomodations-tables): create locations and accomodations tables and the respective foreign keys
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

module.exports = {
  up,
  down
};

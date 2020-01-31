import Hasher from '../server/helpers/passwordHashHelper';

const up = (queryInterface) => queryInterface.bulkInsert('Users', [{
  name: 'Dummy',
  gender: 'Male',
  email: 'dummy1@email.rw',
  username: 'MrDummy',
  password: Hasher.hashPassword('123456789'),
  birthdate: new Date(),
  preferredLanguage: 'French',
  preferredCurrency: 'Euro',
  location: 'Paris',
  role: 'Broker',
  department: 'Cleaner',
  lineManager: 'MrNobody',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

export {
  up,
  down
};

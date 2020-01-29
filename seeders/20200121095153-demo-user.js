import Hasher from '../server/helpers/passwordHashHelper';

const up = (queryInterface) => queryInterface.bulkInsert('users', [{
  name: 'Dummy',
  gender: 'Male',
  email: 'dummy@email.rw',
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

const down = (queryInterface) => queryInterface.bulkDelete('users', null, {});

export {
  up,
  down
};

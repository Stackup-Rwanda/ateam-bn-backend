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
  isVerified: false,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  name: 'Dummy2',
  gender: 'Male',
  email: 'dummy2@email.rw',
  username: 'MrDummy2',
  password: Hasher.hashPassword('123456789'),
  birthdate: new Date(),
  preferredLanguage: 'French',
  preferredCurrency: 'Euro',
  location: 'Paris',
  role: 'Broker',
  department: 'Cleaner',
  lineManager: 'MrNobody',
  isVerified: true,
  createdAt: '7/02/2020',
  updatedAt: '4/3/2000'
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

export {
  up,
  down
};

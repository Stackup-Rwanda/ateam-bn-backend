import Hasher from '../server/helpers/passwordHashHelper';

const dummy1 = {
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
  lineManager: 3,
  isVerified: false,
  createdAt: new Date(),
  updatedAt: new Date()
};
const dummy2 = {
  name: 'Dummy2',
  gender: 'Male',
  email: 'dummy2@email.rw',
  username: 'MrDummy2',
  password: Hasher.hashPassword('123456789'),
  birthdate: new Date(),
  preferredLanguage: 'French',
  preferredCurrency: 'Euro',
  location: 'Paris',
  role: 'Super Administrator',
  department: 'Cleaner',
  lineManager: 3,
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
};
const dummy3 = {
  name: 'Dummy3',
  gender: 'Male',
  email: 'dummy3@email.rw',
  username: 'MrDummy3',
  password: Hasher.hashPassword('123456789'),
  birthdate: new Date(),
  preferredLanguage: 'French',
  preferredCurrency: 'Euro',
  location: 'Paris',
  role: 'Travel Administrator',
  department: 'Cleaner',
  lineManager: 'MrNobody',
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
};
const up = (queryInterface) => queryInterface.bulkInsert('Users', [dummy1, dummy2, dummy3]);

const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

export {
  up,
  down
};

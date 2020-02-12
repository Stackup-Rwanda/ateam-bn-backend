import Hasher from '../server/helpers/passwordHashHelper';

const dummy1 = {
  name: 'Dummy',
  gender: 'Male',
  email: 'dummy@email.rw',
  username: 'Dummy',
  password: Hasher.hashPassword('123456789'),
  birthdate: new Date(),
  preferredLanguage: 'French',
  preferredCurrency: 'Euro',
  locationId: 1,
  role: 'Requester',
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
  locationId: 1,
  role: 'Super Administrator',
  department: 'Cleaner',
  lineManager: 3,
  isVerified: true,
  createdAt: '04/05/2020',
  updatedAt: '02/03/2010'
};
const dummy3 = {
  name: 'Igor Jean-Luc',
  gender: 'Male',
  email: 'nigorjeanluc@gmail.com',
  username: 'Runyamahe',
  password: Hasher.hashPassword('secret123'),
  birthdate: new Date(),
  preferredLanguage: 'French',
  preferredCurrency: 'Euro',
  locationId: 1,
  role: 'Manager',
  department: 'Cleaner',
  lineManager: 3,
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
};
const dummy4 = {
  name: 'Dummy3',
  gender: 'Male',
  email: 'dummy3@email.rw',
  username: 'MrDummy3',
  password: Hasher.hashPassword('123456789'),
  birthdate: new Date(),
  preferredLanguage: 'French',
  preferredCurrency: 'Euro',
  locationId: 1,
  role: 'Travel Administrator',
  department: 'Cleaner',
  lineManager: 3,
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
};
const up = (queryInterface) => queryInterface.bulkInsert('Users', [dummy1, dummy2, dummy3, dummy4]);

const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

export {
  up,
  down
};

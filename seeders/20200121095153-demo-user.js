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
  locationId: 3,
  role: 'Super Administrator',
  department: 'Cleaner',
  lineManager: 5,
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

const dummy5 = {
  name: 'Dummy4',
  gender: 'Male',
  email: 'k.joshua855@gmail.com',
  username: 'byiringiro joshua k.joshua',
  password: Hasher.hashPassword('123456789'),
  birthdate: new Date(),
  preferredLanguage: 'French',
  preferredCurrency: 'Euro',
  locationId: 1,
  role: 'Travel Administrator',
  department: 'Cleaner',
  lineManager: 5,
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
};
const dummy6jajaManager = {
  name: 'Dummy6',
  gender: 'Male',
  email: 'jajajaden01@gmail.com',
  username: 'dummy6jajaManager',
  password: Hasher.hashPassword('123456789'),
  birthdate: new Date(),
  preferredLanguage: 'French',
  preferredCurrency: 'Euro',
  locationId: 1,
  role: 'Manager',
  department: 'Cleaner',
  lineManager: 0,
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
};
const dummy7jajaManager = {
  name: 'Dummy7',
  gender: 'Male',
  email: 'dummy7jaja@email.rw',
  username: 'dummy7jajaManager',
  password: Hasher.hashPassword('123456789'),
  birthdate: new Date(),
  preferredLanguage: 'French',
  preferredCurrency: 'Euro',
  locationId: 1,
  role: 'Manager',
  department: 'Cleaner',
  lineManager: 0,
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
};
const dummy8jajaRequester = {
  name: 'Dummy8',
  gender: 'Male',
  email: 'dummy8jaja@email.rw',
  username: 'dummy8jajaRequester',
  password: Hasher.hashPassword('123456789'),
  birthdate: new Date(),
  preferredLanguage: 'French',
  preferredCurrency: 'Euro',
  locationId: 1,
  role: 'Requester',
  department: 'Cleaner',
  lineManager: 6,
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
};
const dummy9jajaRequester = {
  name: 'Dummy9',
  gender: 'Male',
  email: 'dummy9jaja@email.rw',
  username: 'dummy9jajaRequester',
  password: Hasher.hashPassword('123456789'),
  birthdate: new Date(),
  preferredLanguage: 'French',
  preferredCurrency: 'Euro',
  locationId: 1,
  role: 'Requester',
  department: 'Cleaner',
  lineManager: 6,
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
};
const manzi = {
  name: 'Butirigitwa Manzi',
  gender: 'Male',
  email: 'butirigimanzi@gmail.com',
  username: 'manzi',
  password: Hasher.hashPassword('123456789'),
  birthdate: new Date(),
  preferredLanguage: 'French',
  preferredCurrency: 'Euro',
  locationId: 1,
  role: 'Requester',
  department: 'Cleaner',
  lineManager: 3,
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
};
const jimmyKay = {
  name: 'jimmyKay',
  gender: 'Male',
  email: 'JkayOne2@gmail.com',
  username: 'kay',
  password: Hasher.hashPassword('123456789'),
  birthdate: new Date(),
  preferredLanguage: 'French',
  preferredCurrency: 'Euro',
  locationId: 1,
  role: 'Requester',
  department: 'Cleaner',
  lineManager: 3,
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
};
const up = (queryInterface) => queryInterface.bulkInsert('Users', [dummy1, dummy2, dummy3, dummy4, dummy5, dummy6jajaManager, dummy7jajaManager, dummy8jajaRequester, dummy9jajaRequester, manzi, jimmyKay]);

const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

export {
  up,
  down
};

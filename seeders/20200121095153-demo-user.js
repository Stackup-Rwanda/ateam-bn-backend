import Hasher from '../server/helpers/passwordHashHelper';

const up = (queryInterface) => queryInterface.bulkInsert('Users', [{
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
  lineManager: 3,
  isVerified: true,
  createdAt: '04/05/2020',
  updatedAt: '02/03/2010'
}
]);

const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

export {
  up,
  down
};

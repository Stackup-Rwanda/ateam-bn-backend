import Hasher from '../server/helpers/passwordHashHelper';

const up = (queryInterface) => queryInterface.bulkInsert('Users', [
  {
    name: 'Butirigitwa Manzi',
    gender: 'Male',
    email: 'manzi@gmail.com',
    username: 'manzi',
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
  }]);

const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

export {
  up,
  down
};
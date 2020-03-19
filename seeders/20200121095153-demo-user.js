import Hasher from '../server/helpers/passwordHashHelper';

const dummy1 = {
  name: 'Dummy',
  gender: 'Male',
  email: 'dummy@email.rw',
  username: 'MrDummy',
  password: Hasher.hashPassword('123456789'),
  birthdate: new Date(),
  locationId: 1,
  role: 'REQUESTER',
  rememberMe: false,
  lineManager: 3,
  isVerified: false,
  profilePhoto: 'https://tnj.com/wp-content/uploads/2018/06/JayM.jpg',
  coverPhoto: 'https://cdn.pixabay.com/photo/2019/08/07/06/31/landscape-4389957__340.jpg',
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
  locationId: 3,
  role: 'SUPER ADMINISTRATOR',
  rememberMe: true,
  lineManager: 3,
  isVerified: true,
  profilePhoto: 'https://www.famousbirthdays.com/faces/morrison-jay-image.jpg',
  coverPhoto: 'https://cdn.pixabay.com/photo/2016/11/22/07/26/indiana-dunes-state-park-1848559__340.jpg',
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
  locationId: 1,
  role: 'MANAGER',
  rememberMe: true,
  isVerified: true,
  profilePhoto: 'https://reidrealtors.com/wp-content/uploads/2017/12/pic-bio-melvin26-500x480-c-center.jpg',
  coverPhoto: 'https://cdn.pixabay.com/photo/2019/08/16/08/03/spain-4409669__340.jpg',
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
  locationId: 1,
  role: 'TRAVEL ADMINISTRATOR',
  rememberMe: false,
  lineManager: 3,
  isVerified: true,
  profilePhoto: 'https://express-images.franklymedia.com/3922/sites/22/2018/07/14172802/shutterstock_75148999.jpg',
  coverPhoto: 'https://img.wallpapersafari.com/desktop/1600/900/99/99/fQ1tv8.jpg',
  createdAt: new Date(),
  updatedAt: new Date()
};
const dummy5 = {
  name: 'Dummy4',
  gender: 'Male',
  email: 'k.joshua800@gmail.com',
  username: 'byiringiro',
  password: Hasher.hashPassword('123456789'),
  birthdate: new Date(),
  locationId: 1,
  role: 'TRAVEL ADMINISTRATOR',
  rememberMe: false,
  lineManager: 3,
  isVerified: true,
  profilePhoto: 'https://i.pinimg.com/originals/30/31/57/3031576f4b504d81eff8c1773af6d9ca.jpg',
  coverPhoto: 'https://mcdn.wallpapersafari.com/medium/7/24/8EvwRT.jpg',
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
  locationId: 1,
  role: 'MANAGER',
  lineManager: 3,
  isVerified: true,
  profilePhoto: 'https://i.pinimg.com/originals/8f/a4/d0/8fa4d023fc445b42b18bff6decbd7108.jpg',
  coverPhoto: 'https://mcdn.wallpapersafari.com/medium/42/66/MsGhLn.jpg',
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
  locationId: 1,
  role: 'MANAGER',
  lineManager: 3,
  isVerified: true,
  profilePhoto: 'https://i.pinimg.com/236x/dc/af/af/dcafafc690d67dcdbe70353a17f35e6a--marlon-wayans-black-chicks.jpg',
  coverPhoto: 'https://mcdn.wallpapersafari.com/medium/13/63/VRcz4w.jpg',
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
  locationId: 1,
  role: 'REQUESTER',
  lineManager: 3,
  isVerified: true,
  profilePhoto: 'https://i.redd.it/u8mcqk7kxam01.jpg',
  coverPhoto: 'https://mcdn.wallpapersafari.com/medium/8/31/vUw2da.jpg',
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
  locationId: 1,
  role: 'REQUESTER',
  lineManager: 3,
  isVerified: true,
  profilePhoto: 'https://i.pinimg.com/474x/93/86/7f/93867fc2c1e8e3fb5b40595468d2f976--african-american-actors-african-americans.jpg',
  coverPhoto: 'https://mcdn.wallpapersafari.com/medium/6/16/RTiA6r.jpg',
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
  locationId: 1,
  role: 'REQUESTER',
  rememberMe: false,
  lineManager: 3,
  isVerified: true,
  profilePhoto: 'https://www.indiewire.com/wp-content/uploads/2018/01/screen-shot-2018-01-30-at-2-44-14-pm.png',
  coverPhoto: 'https://mcdn.wallpapersafari.com/medium/88/46/r9CjLW.jpg',
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
  locationId: 1,
  role: 'REQUESTER',
  lineManager: 3,
  isVerified: true,
  profilePhoto: 'https://media3.s-nbcnews.com/i/newscms/2017_27/2062091/profile_picture_682959292d573956be3612eee54559bf.png',
  coverPhoto: 'https://mcdn.wallpapersafari.com/medium/80/27/bJLOVW.jpg',
  createdAt: new Date(),
  updatedAt: new Date()
};
const Doddy = {
  name: 'Kalimba K Doddy',
  gender: 'male',
  email: 'kwizeradoddy@gmail.com',
  username: 'doddy',
  password: Hasher.hashPassword('kalimba123'),
  birthdate: new Date(),
  preferredLanguage: 'English',
  preferredCurrency: 'Euro',
  locationId: 1,
  role: 'SUPER ADMINISTRATOR',
  lineManager: null,
  isVerified: true,
  profilePhoto: 'https://a4-images.myspacecdn.com/images03/2/52b5b2cd5dd54aea84001f8376f2b149/600x600.jpg',
  coverPhoto: 'https://mcdn.wallpapersafari.com/medium/7/90/N4hHDj.jpg',
  createdAt: new Date(),
  updatedAt: new Date()
};
const Guevara = {
  name: 'Manzi Guevara',
  gender: 'male',
  email: 'manziguevara@gmail.com',
  username: 'gege',
  password: Hasher.hashPassword('manzi123'),
  birthdate: new Date(),
  preferredLanguage: 'English',
  preferredCurrency: 'Euro',
  locationId: 1,
  role: 'TRAVEL ADMINISTRATOR',
  lineManager: null,
  isVerified: true,
  profilePhoto: '',
  coverPhoto: 'https://mcdn.wallpapersafari.com/medium/63/87/5KacWj.jpg',
  createdAt: new Date(),
  updatedAt: new Date()
};
const Karen = {
  name: 'Giramata Karen',
  gender: 'female',
  email: 'kgiramata57@gmail.com',
  username: 'karen',
  password: Hasher.hashPassword('giramata123'),
  birthdate: new Date(),
  preferredLanguage: 'English',
  preferredCurrency: 'Euro',
  locationId: 1,
  role: 'REQUESTER',
  lineManager: null,
  isVerified: true,
  profilePhoto: 'https://i.pinimg.com/originals/74/1d/31/741d311a7842ed99ed3cc1996f76652e.jpg',
  coverPhoto: 'https://mcdn.wallpapersafari.com/medium/3/63/U0m2vs.jpg',
  createdAt: new Date(),
  updatedAt: new Date()
};
const dummy100 = {
  name: 'Igor Jean-Luc100',
  gender: 'Male',
  email: 'amphoteric05@live.com',
  username: 'Runyamahe100',
  password: Hasher.hashPassword('secret123'),
  birthdate: new Date(),
  locationId: 1,
  role: 'MANAGER',
  rememberMe: true,
  isVerified: true,
  profilePhoto: 'https://pmcvariety.files.wordpress.com/2018/05/ryan-coogler-cannes.jpg',
  coverPhoto: 'https://mcdn.wallpapersafari.com/medium/15/50/6PNTGl.jpg',
  createdAt: new Date(),
  updatedAt: new Date()
};
const dummy101 = {
  name: 'Igor Jean-Luc101',
  gender: 'Male',
  email: 'jeanluc05@live.com',
  username: 'Runyamahe101',
  password: Hasher.hashPassword('secret123'),
  birthdate: new Date(),
  locationId: 1,
  role: 'MANAGER',
  rememberMe: true,
  isVerified: true,
  profilePhoto: 'https://cdn.pixabay.com/photo/2019/08/16/08/03/spain-4409669__340.jpg',
  coverPhoto: 'https://mcdn.wallpapersafari.com/medium/15/50/6PNTGl.jpg',
  createdAt: new Date(),
  updatedAt: new Date()
};
const up = (queryInterface) => queryInterface.bulkInsert('Users', [dummy1, dummy2, dummy3, dummy4, dummy5, dummy6jajaManager, dummy7jajaManager, dummy8jajaRequester, dummy9jajaRequester, manzi, jimmyKay, Doddy, Guevara, Karen, dummy100, dummy101]);
const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});
export {
  up,
  down
};

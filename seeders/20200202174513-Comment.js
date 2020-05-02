const up = (queryInterface) => queryInterface.bulkInsert('Comments', [{
  userId: 1,
  tripId: 1,
  userName: 'Mr Dummy',
  userRole: 'Requester',
  comment: 'First Comment',
  profile: 'https://tnj.com/wp-content/uploads/2018/06/JayM.jpg',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Comments', null, {});

export {
  up,
  down
};

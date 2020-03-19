const up = (queryInterface) => queryInterface.bulkInsert('Notifications', [
  {
    tripId: 1,
    receiverId: 2,
    description: 'You have been assigned a new task',
    viewed: 'read',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tripId: 1,
    receiverId: 4,
    description:
      'You have a new Notification. You have been assigned a new Task, forget about the old one',
    viewed: 'read',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tripId: 1,
    receiverId: 4,
    description: 'Manager has approved your trip request',
    viewed: 'unread',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tripId: 1,
    receiverId: 3,
    description: 'Manager has approved your trip request',
    viewed: 'unread',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tripId: 1,
    receiverId: 3,
    description: 'Manager has approved your trip request',
    viewed: 'unread',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

const down = (queryInterface) => queryInterface.bulkDelete('Notifications', null, {});

export { up, down };

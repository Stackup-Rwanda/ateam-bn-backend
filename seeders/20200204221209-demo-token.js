const up = (queryInterface) => queryInterface.bulkInsert('validtokens', [
  {
    tokens:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY2F0ZWdvcnkiOiJhZG1pbiIsImZpcnN0bmFtZSI6Im1pbmFuaSIsImxhc3RuYW1lIjoiam9zaHVhIiwidXNlcm5hbWUiOiJrZXktam9zaHVhIiwiZW1haWwiOiJrLmpvc2h1YTg1NUBnbWFpbC5jb20iLCJwaG9uZW51bWJlciI6IjA3ODk2MTk0NDIiLCJwYXNzd29yZCI6IiQyYSQxMiQzVDN3RG1QZU5CYVplOXVGZm0yM3plZ3VVT29Sd1d6cDVuMUU3LnJUWnNWcVp1aXBLN1NvbSIsImNyZWF0ZWRkYXRlIjoiMjAxOS0xMS0wNFQxNjowMjoyMi4zMTVaIiwibW9kaWZpZWRkYXRlIjoiIG5vbmUiLCJpYXQiOjE1ODAyNzg5MjgsImV4cCI6MTY2NjY3ODkyOH0.GBTZe8FjA7dvw3NWlPfXVQxBEHFlap6798A71C61fs0',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

const down = (queryInterface) => queryInterface.bulkDelete('validtokens', null, {});

export { up, down };

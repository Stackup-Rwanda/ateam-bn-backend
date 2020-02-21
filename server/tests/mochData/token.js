/**
   * class token  which holds tokens will be used in validating token.
   */
class TokenHelp {
  /**
           * those are two variable names which is holding token will be used in our test.
           */
  constructor() {
    this.validToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQnV0aXJpZ2l0d2EgTWFuemkiLCJ1c2VybmFtZSI6Im1hbnppIiwiZW1haWwiOiJtYW56aUBnbWFpbC5jb20iLCJpYXQiOjE1ODA4MjA1MTZ9.jPcc3YOJCGZaq-3Y-hQNQG_VlzijnocglCg5b0twHYA`;
    this.UnExistUser = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltbXkgS2F5a2F5IiwidXNlcm5hbWUiOiJrYXkiLCJlbWFpbCI6IkprYXlAZ21haWwuY29tIiwiaWF0IjoxNTgwODIwNjAwfQ.GugiqBFSyVbZqt7X4b19Abu6mXlJDTU3RyXTtepNNuY`;
    this.invalidToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltbXkgS2F5a2F5IiwidXNlcm5hbWUiOiJrYXkiLCJlbWFpbCI6IkprYXlAZ21haWwuY29tIiwiaWF0IjoxNTgwODIwNjAwfQ.GugiqBFSyVbZqt7X4b19Abu6mXlJDTU3RyXTtepNNuYgfsdfgdfg`;
  }
}

const exprtTokenHelp = new TokenHelp();
export default exprtTokenHelp;

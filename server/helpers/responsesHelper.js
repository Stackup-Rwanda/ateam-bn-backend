import tokenHelper from './TokenHelper';

const responses = (code, response, data) => {
  response.status(code).send({
    status: code,
    message: `welcome ${data.name} you are signed up`,
    data: {
      token: tokenHelper.generateToken(data.id, data.username, data.email, data.role)
    }
  });
};

export default responses;

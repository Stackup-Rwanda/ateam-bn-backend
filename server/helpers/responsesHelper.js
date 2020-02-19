import tokenHelper from './TokenHelper';

const responses = async (code, response, data) => {
  response.status(code).send({
    status: code,
    message: `welcome ${data.name}`,
    data: {
      token: await tokenHelper.generateToken(data.id, data.username, data.email, data.role, true)
    }
  });
};

export default responses;

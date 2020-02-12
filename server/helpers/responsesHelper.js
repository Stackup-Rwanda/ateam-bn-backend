import tokenHelper from './TokenHelper';

const responses = async (code, response, data) => {
  const { id } = data;
  response.status(code).send({
    status: code,
    message: `welcome ${data.name}`,
    data: {
      id,
      token: await tokenHelper.generateToken(data.id, data.username, data.email, data.role)
    }
  });
};

export default responses;

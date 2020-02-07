import tokenHelper from './TokenHelper';

const authorization = (facebook, fb) => {
  if (facebook) {
    return fb.status(200).json({
      status: 200,
      message: `welcome ${facebook.name}`,
      data: {
        token: tokenHelper.generateToken(
          facebook.id,
          facebook.username,
          facebook.email,
          facebook.role
        )
      }
    });
  }
};
export default authorization;

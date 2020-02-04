const validTokens = (sequelize, DataTypes) => {
  const validtokens = sequelize.define(
    'validtokens',
    {
      tokens: DataTypes.STRING(1000)
    },
    {}
  );
  return validtokens;
};
export default validTokens;

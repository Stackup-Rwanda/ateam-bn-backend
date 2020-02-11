import responses from './responsesHelper';

const authorize = (facebookUser, fbResponse) => {
  if (facebookUser) responses(200, fbResponse, facebookUser);
};

export default authorize;

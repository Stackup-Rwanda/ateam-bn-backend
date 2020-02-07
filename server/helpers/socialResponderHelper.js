import responses from './responsesHelper';

const authorization = (facebook, fb) => {
  if (facebook) responses(200, fb, facebook);
};
export default authorization;

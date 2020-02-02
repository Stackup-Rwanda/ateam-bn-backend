import importQuery from '../models/interactWithTable';

class AuthUsers {
  async logout(req, res) {
    try {
      await importQuery.deleteValidToken(req.headers.authorization);
      return res
        .status(200)
        .json({ status: 200, message: ` Hey Joshua !! you are logged out successfully` });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: ' something goes wrong '
      });
    }
  }
}

const exportAuthUsers = new AuthUsers();
export default exportAuthUsers;

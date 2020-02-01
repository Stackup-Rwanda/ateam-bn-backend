import databaseConnection from '../config/dbConnectWithSequelize';
import validTokenTable from './migrations/createValidTokenTableQuery';

class InteractDatabase {
  deleteValidToken(valitoken1) {
    databaseConnection.sync().then(() => {
      validTokenTable.destroy({ where: { token: valitoken1 } });
    });
  }
}
const exportInteractDatabaseClass = new InteractDatabase();
export default exportInteractDatabaseClass;

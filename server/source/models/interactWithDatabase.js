import databaseConnection from '../configDB/dbConnectWithSequelize';
import validTokenTable from './migrations/createValidTokenTableQuery';

class InteractDatabase {
  deleteValidToken(valitoken1) {
    databaseConnection.sync({ logging: console.log, force: true }).then(() => {
      validTokenTable.destroy({ where: { token: valitoken1 } });
    });
  }
}
const exportInteractDatabaseClass = new InteractDatabase();
export default exportInteractDatabaseClass;

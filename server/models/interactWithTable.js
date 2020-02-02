import validTokenTable from './migrations/createValidTokenTableQuery';

class InteractTable {
  deleteValidToken(valitoken1) {
    validTokenTable.destroy({ where: { token: valitoken1 } });
  }
}
const exportInteractTableClass = new InteractTable();
export default exportInteractTableClass;

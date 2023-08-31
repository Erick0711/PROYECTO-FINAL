using System.Data;
using backend.connection;
using backend.entity;
using Dapper;

namespace backend.services
{
    public class RolServices{
        // OBTENER TODAS LAS PERSONAS
        public static IEnumerable<T> GetAll<T>()
        {
            return BDManager.GetInstance.GetData<T>("SELECT TOP 5 * FROM ROL WHERE STATE = 1 ORDER BY ID DESC");
        }
        
        public static T GetById<T>(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("ID", id, DbType.Int64);
            var result = BDManager.GetInstance.GetDataWithParameters<T>("SELECT * FROM ROL WHERE ID=@ID", parameters);

            return result.FirstOrDefault();
        }

        public static int Insert(Rol rol)
        {
            const string sql = "INSERT INTO rol (name) VALUES (@NAME)";
            var parameters = new DynamicParameters();
            parameters.Add("NAME", rol.Name, DbType.String);

            var result = BDManager.GetInstance.SetData(sql, parameters);
            return result;
        }
        public static int Update(Rol rol)
        {

            const string sql = "UPDATE rol SET name=@NAME WHERE id=@ID";
            var parameters = new DynamicParameters();
            parameters.Add("NAME", rol.Name, DbType.String);
            parameters.Add("ID", rol.Id, DbType.String);
            var result = BDManager.GetInstance.SetData(sql, parameters);
            return result;
        }

         // Eliminacion logica
        public static int Delete(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("ID", id, DbType.Int64);
            var result = BDManager.GetInstance.SetData("UPDATE rol SET state=0 WHERE id=@ID", parameters);
            return result;
        }
    }
}
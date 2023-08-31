using System.Data;
using backend.connection;
using backend.entity;
using Dapper;

namespace backend.services
{
    public class PersonServices{
        // OBTENER TODAS LAS PERSONAS
        public static IEnumerable<T> GetAll<T>()
        {
            return BDManager.GetInstance.GetData<T>("SELECT TOP 5 * FROM PERSON WHERE STATE = 1 ORDER BY ID DESC");
        }
        
        public static T GetById<T>(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("ID", id, DbType.Int64);
            var result = BDManager.GetInstance.GetDataWithParameters<T>("SELECT * FROM PERSON WHERE ID=@ID", parameters);

            return result.FirstOrDefault();
        }

        public static int Insert(Person person)
        {
            const string sql = "INSERT INTO person (name, lastname, ci, phone) VALUES (@NAME, @LASTNAME, @CI, @PHONE);";
            var parameters = new DynamicParameters();
            parameters.Add("NAME", person.Name, DbType.String);
            parameters.Add("LASTNAME", person.LastName, DbType.String);
            parameters.Add("CI", person.Ci, DbType.Int64);
            parameters.Add("PHONE", person.Phone, DbType.Int64);

            var result = BDManager.GetInstance.SetData(sql, parameters);
            return result;
        }
        public static int Update(Person person)
        {

            const string sql = "UPDATE person SET name=@NAME, lastname=@LASTNAME, ci=@CI, phone=@PHONE WHERE id=@ID";
            var parameters = new DynamicParameters();
            parameters.Add("NAME", person.Name, DbType.String);
            parameters.Add("LASTNAME", person.LastName, DbType.String);
            parameters.Add("CI", person.Ci, DbType.Int64);
            parameters.Add("PHONE", person.Phone, DbType.Int64);
            parameters.Add("ID", person.Id, DbType.Int64);

            var result = BDManager.GetInstance.SetData(sql, parameters);
            return result;
        }

         // Eliminacion logica
        public static int Delete(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("ID", id, DbType.Int64);
            var result = BDManager.GetInstance.SetData("UPDATE person SET state=0 WHERE id=@ID", parameters);
            return result;
        }
    }
}
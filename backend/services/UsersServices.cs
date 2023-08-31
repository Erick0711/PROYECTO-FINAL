using System.Data;
using backend.connection;
using backend.entity;
using Dapper;

namespace backend.services
{
    public class UsersServices{
        // OBTENER TODAS LAS PERSONAS
        public static IEnumerable<T> GetAll<T>()
        {
            return BDManager.GetInstance.GetData<T>("select users.id, users.id_person, username,password,image,name,lastname,ci,phone from users inner join person on users.id_person=person.id WHERE users.state = 1");
        }
        
        public static T GetById<T>(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("ID", id, DbType.Int64);
            var result = BDManager.GetInstance.GetDataWithParameters<T>("SELECT * FROM USERS WHERE ID=@ID", parameters);

            return result.FirstOrDefault();
        }

        public static int Insert(Users user)
        {
            const string sql = "INSERT INTO USERS (id_person, username, password, image) VALUES (@ID_PERSON, @USERNAME, @PASSWORD, @IMAGE);";
            var parameters = new DynamicParameters();
            parameters.Add("ID_PERSON", user.IdPerson, DbType.Int64);
            parameters.Add("USERNAME", user.UserName, DbType.String);
            parameters.Add("PASSWORD", user.Password, DbType.String);
            parameters.Add("IMAGE", user.Image, DbType.String);

            var result = BDManager.GetInstance.SetData(sql, parameters);
            return result;
        }

        public static int Update(Users user)
        {

            const string sql = "UPDATE USERS SET password=@PASSWORD, image=@IMAGE WHERE id=@ID";
            var parameters = new DynamicParameters();
            // parameters.Add("USERNAME", user.UserName, DbType.String);
            parameters.Add("PASSWORD", user.Password, DbType.String);
            parameters.Add("IMAGE", user.Image, DbType.String);
            parameters.Add("ID", user.Id, DbType.Int64);

            var result = BDManager.GetInstance.SetData(sql, parameters);
            return result;
        }

        // Eliminacion logica
        public static int Delete(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("ID", id, DbType.Int64);
            var result = BDManager.GetInstance.SetData("UPDATE users SET state=0 WHERE id=@ID", parameters);
            return result;
        }
    }
}
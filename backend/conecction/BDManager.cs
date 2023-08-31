using Dapper;
using System.Data.SqlClient;

namespace backend.connection
{
    //Clase de conexion con la base de datos que utiliza el ORM de Dapper
    public sealed class BDManager{

        private static readonly object lockObj = new();
        private static BDManager? instance;

        private BDManager(){

        }
        
        //Uso del Patron de Diseño SINGLETON
        public static BDManager GetInstance
        {
            get
            {
                lock(lockObj){
                    
                    if(instance == null){
                        instance = new BDManager();
                    }
                }
                return instance;
            }
        }

        // Cadena de conexion que se obtiene externamente
        public string? ConnectionString { get; set; }

        //Metodo para obtener un listado de la base de datos (Dapper)
        public IEnumerable<T> GetData<T>(string sql){
            using var connection =  new SqlConnection(ConnectionString);
            connection.Open();
            // Quitar los guiones bajos de las tablas
            DefaultTypeMap.MatchNamesWithUnderscores = true;
            return connection.Query<T>(sql);
        }

        //Metodo para obtener un listado de la base de datos con parametros (Dapper)
        public IEnumerable<T> GetDataWithParameters<T>(string sql, DynamicParameters dynamicParameters){
            using var connection = new SqlConnection(ConnectionString);
            connection.Open();
            DefaultTypeMap.MatchNamesWithUnderscores = true;
            return connection.Query<T>(sql, dynamicParameters);
        }

        //Metodo para escribir en la base de datos
        public int SetData(string sql, DynamicParameters dynamicParameters)
        {
            using var connection = new SqlConnection(ConnectionString);
            connection.Open();
            DefaultTypeMap.MatchNamesWithUnderscores = true;
            return connection.Execute(sql, dynamicParameters);
        }

    }
}
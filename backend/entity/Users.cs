namespace backend.entity
{
    public class Users: Person {
        public int Id {get; set;}
        public int IdPerson {get; set;}
        // public Person person {get; set;}
        public string UserName {get; set;}
        public string Password {get; set;}
        public string Image {get; set;}
    }
}
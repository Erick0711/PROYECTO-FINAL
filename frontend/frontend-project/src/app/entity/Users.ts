import { Person } from "./Person";

export class Users extends Person{
    public idUsers: number | undefined;
    public idPerson: number | undefined;
    public userName:string = "";
    public email:string = "";
    public password: string= "";
    public image:string = "";
}

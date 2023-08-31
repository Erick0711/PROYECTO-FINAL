import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from 'src/app/entity/Users';
@Injectable({
  providedIn: 'root'
})
export class UsersService {


  PORT = 5003;

  PATH_BACKEND = `http://localhost:${this.PORT}`;

  URL_GET = `${this.PATH_BACKEND}/api/Users/GetAllUsers`;
  URL_GET_PERSON = `${this.PATH_BACKEND}/api/Person/GetAllPerson`;

  URL_ADD_USERS = `${this.PATH_BACKEND}/api/Users/AddUsers`;
  URL_GET_BY_ID_USERS= `${this.PATH_BACKEND}/api/Users/GetUsersById`;
  URL_EDIT_USER = `${this.PATH_BACKEND}/api/Users/EditUsers`;
  URL_DELETE_PERSON = `${this.PATH_BACKEND}/api/Users/DeleteUsers`;


  constructor(private httpClient: HttpClient) { }

  public GetUsers(): Observable<HttpResponse<any>>
  {
    return this.httpClient
    .get<any>(this.URL_GET,
    {observe: 'response'})
    .pipe();
  }

  public GetPerson(): Observable<HttpResponse<any>>
  {
    return this.httpClient
    .get<any>(this.URL_GET,
    {observe: 'response'})
    .pipe();
  }
  public AddUsers(entidad: Users): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.URL_ADD_USERS, entidad,
        { observe: 'response' })
      .pipe();
  }

  GetByIdUsers(id: number | undefined): Observable<HttpResponse<any>> {
    const url = `${this.URL_GET_BY_ID_USERS}?id=${id}`;
    return this.httpClient.get<any>(url, { observe: 'response' });
  }

  EditUsers(entidad: Users): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.URL_EDIT_USER, entidad,
        { observe: 'response' })
      .pipe();
  }

  DeletePerson(id: number | undefined): Observable<HttpResponse<any>> {
    const url = `${this.URL_DELETE_PERSON}?id=${id}`;
    return this.httpClient.put<any>(url, null, { observe: 'response' }).pipe();
  }
}

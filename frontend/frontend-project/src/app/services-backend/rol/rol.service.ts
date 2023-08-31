import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/entity/Rol';
@Injectable({
  providedIn: 'root'
})
export class RolService {

  PORT = 5003;

  PATH_BACKEND = `http://localhost:${this.PORT}`;

  URL_GET = `${this.PATH_BACKEND}/api/Rol/GetAllRol`;
  URL_ADD_PERSON = `${this.PATH_BACKEND}/api/Rol/AddRol`;
  URL_GET_BY_ID_PERSON = `${this.PATH_BACKEND}/api/Rol/GetRolById`;
  URL_EDIT_PERSON = `${this.PATH_BACKEND}/api/Rol/EditRol`;
  URL_DELETE_PERSON = `${this.PATH_BACKEND}/api/Rol/DeleteRol`;


  constructor(private httpClient: HttpClient) { }

  public GetRol(): Observable<HttpResponse<any>>
  {
    return this.httpClient
    .get<any>(this.URL_GET,
    {observe: 'response'})
    .pipe();
  }

  public AddRol(entidad: Rol): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.URL_ADD_PERSON, entidad,
        { observe: 'response' })
      .pipe();
  }

  GetByIdRol(id: number | undefined): Observable<HttpResponse<any>> {
    const url = `${this.URL_GET_BY_ID_PERSON}?id=${id}`;
    return this.httpClient.get<any>(url, { observe: 'response' });
  }

  EditRol(entidad: Rol): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.URL_EDIT_PERSON, entidad,
        { observe: 'response' })
      .pipe();
  }

  DeleteRol(id: number | undefined): Observable<HttpResponse<any>> {
    const url = `${this.URL_DELETE_PERSON}?id=${id}`;
    return this.httpClient.put<any>(url, null, { observe: 'response' });
  }
}

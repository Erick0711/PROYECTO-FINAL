import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from 'src/app/entity/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  PORT = 5003;

  PATH_BACKEND = `http://localhost:${this.PORT}`;

  URL_GET = `${this.PATH_BACKEND}/api/Person/GetAllPerson`;
  URL_ADD_PERSON = `${this.PATH_BACKEND}/api/Person/AddPerson`;
  URL_GET_BY_ID_PERSON = `${this.PATH_BACKEND}/api/Person/GetPersonById`;
  URL_EDIT_PERSON = `${this.PATH_BACKEND}/api/Person/EditPerson`;
  URL_DELETE_PERSON = `${this.PATH_BACKEND}/api/Person/DeletePerson`;


  constructor(private httpClient: HttpClient) { }

  public GetPerson(): Observable<HttpResponse<any>>
  {
    return this.httpClient
    .get<any>(this.URL_GET,
    {observe: 'response'})
    .pipe();
  }

  public AddPerson(entidad: Person): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.URL_ADD_PERSON, entidad,
        { observe: 'response' })
      .pipe();
  }

  GetByIdPerson(id: number | undefined): Observable<HttpResponse<any>> {
    const url = `${this.URL_GET_BY_ID_PERSON}?id=${id}`;
    return this.httpClient.get<any>(url, { observe: 'response' });
  }

  EditPerson(entidad: Person): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.URL_EDIT_PERSON, entidad,
        { observe: 'response' })
      .pipe();
  }

  DeletePerson(id: number | undefined): Observable<HttpResponse<any>> {
    const url = `${this.URL_DELETE_PERSON}?id=${id}`;
    return this.httpClient.put<any>(url, null, { observe: 'response' });
  }
}

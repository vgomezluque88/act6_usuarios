import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Iuser } from '../interfaces/iuser.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  clienthttp = inject(HttpClient);
  baseurl = "https://peticiones.online/api/users";


  //Observable
  getAll(): Observable<any> {
    return this.clienthttp.get<[]>(this.baseurl);
  }

  getById(id: string): Promise<Iuser> {
    return lastValueFrom(this.clienthttp.get<Iuser>(`${this.baseurl}/${id}`));
  }

  delete(id: string): Promise<Iuser> {
    return lastValueFrom(this.clienthttp.delete<Iuser>(`${this.baseurl}/${id}`));
  }

  insert(formulario: Iuser): Promise<Iuser> {
    return lastValueFrom(this.clienthttp.post<Iuser>(this.baseurl, formulario));
  }

  update(formulario: Iuser): Promise<Iuser> {
    return lastValueFrom(this.clienthttp.put<Iuser>(`${this.baseurl}/${formulario._id}`, formulario));
  }
}

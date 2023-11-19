import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  URL = ' http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  CreateAddress(address:any):Observable<any>{
    return this.http.post<any>(`${this.URL}/address`,address)
  }
  UpdateAddress(id:any, address:any):Observable<any>{
    return this.http.put<any>(`${this.URL}/address/${id}`,address)
  }
  deleteAddress(id:any):Observable<any>{
    return this.http.delete<any>(`${this.URL}/address/${id}`)
  }
  getAddress():Observable<any[]>{
    return this.http.get<any[]>(`${this.URL}/address`)
  }
  getOneAddress(id:any):Observable<any>{
    return this.http.get<any>(`${this.URL}/address/${id}`)
  }
  saveIdAddress(idAddress:any):void{
    localStorage.setItem('idAddress',JSON.stringify(idAddress))
  }
  getIdAddress():string{
    return localStorage.getItem('idAddress') || ''
  }
}

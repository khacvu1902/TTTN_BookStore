import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OderService {
  URL = 'http://localhost:8080/api/order'
  constructor(private http:HttpClient) { }

  createOderCart(cart:any):Observable<any>{
    return this.http.post<any>(`${this.URL}/create`,cart)
  }
  GetOderCart():Observable<any[]>{
    return this.http.get<any[]>(`${this.URL}/getAll`)
  }
  cancelOrderCart(id:any):Observable<any>{
    return this.http.delete<any>(`${this.URL}/cancelOrder/${id}`)
  }
}

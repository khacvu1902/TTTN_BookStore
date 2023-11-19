import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = ' http://localhost:8080/api';
  private loggedIn: boolean = false;

  constructor(private http:HttpClient) { };

  login(user:any): Observable<any> {
    return this.http.post<any>(`${this.URL}/signin`,user)
  }
  register(user:any): Observable<any> {
    return this.http.post<any>(`${this.URL}/signup`,user)
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUsers(id:any): Observable<any>{
    return this.http.get<any>(`${this.URL}/user/${id}`)
  }

  updateAuth(id:any,user:any): Observable<any>{
    return this.http.put<any>(`${this.URL}/user/${id}`, user)
  }
  removeUser(){
    return localStorage.clear()
  }

  saveUser(user:any): void{
    return localStorage.setItem('user', JSON.stringify(user))
  }
  getUserLocal():any{
    return localStorage.getItem('user')
  }

  savetoken(token:any):void{
    localStorage.setItem('access_token',token)
  }

  getAccessToken():string{
    return localStorage.getItem('access_token') || '';
  }
}

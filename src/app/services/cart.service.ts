import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  URL = 'http://localhost:8080/api/user'
  constructor(private http:HttpClient , private authService:AuthService) { }

  getCartProductByUserId(userId:string): Observable<any>{
    return this.http.get(`${this.URL}/${userId}/cart`)
  }

  addToCart(userId:any,productId:any ,addCart:any): Observable<any>{
    const accessToken = this.authService.getAccessToken(); // Lấy accessToken từ AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post<any>(`${this.URL}/${userId}/cart/add/${productId}`,addCart , {headers})
  }
    
  RemoveCartProductByUserId( userId:any, itemId:any): Observable<any>{
    return this.http.delete<any>(`${this.URL}/${userId}/cart/remove/${itemId}`)
  }
}

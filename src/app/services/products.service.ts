import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';




@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  URL = ' http://localhost:8080/api/products';
  constructor(private http: HttpClient, private authService: AuthService) { };

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}`);
  }
  getIdProducts(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.URL}/${id}`);
  }
  removeProducts(id: string | number): Observable<any> {
    const accessToken = this.authService.getAccessToken(); // Lấy accessToken từ AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete<any>(`${this.URL}/${id}`,{headers});
  }

  updateProducts(product: any, id: any, accessToken: any): Observable<any> {
    // Lấy accessToken từ AuthService
    const headers = new HttpHeaders({ 'content-type': 'application/json' , Authorization: 'Bearer ' + accessToken });
    return this.http.put(`${this.URL}/${id}`, product , { headers});
  }

  postProducts(product: any): Observable<any> {
    const accessToken = this.authService.getAccessToken(); // Lấy accessToken từ AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post<any>(`${this.URL}`, product, { headers });
  }
}

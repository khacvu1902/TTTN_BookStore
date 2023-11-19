import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  URL = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }

  getCommentByProducts(productId:any): Observable<any> {
    return this.http.get<any>(`${this.URL}/comment/product/${productId}`)
  }
  createCommentByProducts(content:any): Observable<any> {
    return this.http.post<any>(`${this.URL}/comment/`,content)
  }

  createRatingByProduct(rating:any): Observable<any> {
    return this.http.post<any>(`${this.URL}/rating`,rating)
  }

  deleteRating(id:any): Observable<any> {
    return this.http.delete<any>(`${this.URL}/rating/${id}`)
  }
  deleteComment(id:any): Observable<any> {
    return this.http.delete<any>(`${this.URL}/comment/${id}`)
  }

  getratingByUser(id:any): Observable<any> {
    return this.http.get<any>(`${this.URL}/rating/user/${id}`)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}
  sendMessage(request: any) {
    const headers = new HttpHeaders({
      token: request.token,
    });
    return this.http.post<Array<any>>(`${request.url}`, request.body, {
      headers,
    });
  }
}

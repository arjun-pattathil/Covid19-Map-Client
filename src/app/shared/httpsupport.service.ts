import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpsupportService {

  constructor(private httpClient: HttpClient) { }
  getData = (url) => {
    return this.httpClient.get(url);
  }
  putData = (url, payload) => {
    return this.httpClient.put(url, payload);
  }
}

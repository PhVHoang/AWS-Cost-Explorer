import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RestapiService implements OnInit{

  private REST_API_SERVER_URL = 'http://127.0.0.1:5000/';
  constructor(private http: HttpClient) { }

  public getCostUsage() {
    return this.http.get(this.REST_API_SERVER_URL);
  }

  ngOnInit(){}
}

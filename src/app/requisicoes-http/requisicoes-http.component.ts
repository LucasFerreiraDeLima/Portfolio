import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requisicoes-http',
  templateUrl: './requisicoes-http.component.html',
  styleUrls: ['./requisicoes-http.component.css']
})
export class RequisicoesHttpComponent implements OnInit{

  public getJson: any;
  public idUser: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getJsonInfo()
  }

  getJsonInfo() {
    this.http.get('https://reqres.in/api/users?page=2').subscribe((data) => {
      console.log(data);
      this.getJson = data;
    })
  }
}

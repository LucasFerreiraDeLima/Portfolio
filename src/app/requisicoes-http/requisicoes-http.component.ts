import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requisicoes-http',
  templateUrl: './requisicoes-http.component.html',
  styleUrls: ['./requisicoes-http.component.css']
})
export class RequisicoesHttpComponent implements OnInit{

  public getJson: any;
  public postJson: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getJsonInfo();
    this.postJsonInfo();
  }

  getJsonInfo() {
    this.http.get('https://reqres.in/api/users?page=2').subscribe((data) => {
      console.log(data);
      this.getJson = data;
    })
  }

  postJsonInfo() {
    let body = {
      title: 'Olá, Gui',
      body: 'Bom dia',
      userId: 1,
    }

    this.http.post('https://jsonplaceholder.typicode.com/posts', body).subscribe((data) => {
      console.log(data);
      return this.postJson = data;
    })
  }
}

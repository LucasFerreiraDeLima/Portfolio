import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {

  constructor(private router: Router) {}

  redirecionarSobre() {
    this.router.navigate(['sobre']);
  }

  redirecionarExperiencia() {
    this.router.navigate(['experiencia']);
  }

  redirecionarConquistas() {
    this.router.navigate(['conquistas']);
  }

  redirecionarContato(){
    this.router.navigate(['contato']);
  }
}

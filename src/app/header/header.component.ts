import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) {}

  redirecionarHome() {
    this.router.navigate(['home']);
  }
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

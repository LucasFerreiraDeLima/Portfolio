import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { ConquistasComponent } from './conquistas/conquistas-habilidades.component';
import { ContatoComponent } from './contato/contato.component';
import { RequisicoesHttpComponent } from './requisicoes-http/requisicoes-http.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'experiencia', component: ExperienciaComponent },
  { path: 'conquistas', component: ConquistasComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'http-testes', component: RequisicoesHttpComponent},
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

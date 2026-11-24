import { Component, Injectable, NgModule } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { ConquistasComponent } from './conquistas/conquistas-habilidades.component';
import { ContatoComponent } from './contato/contato.component';
import { ArchitectureLabComponent } from './architecture-lab/architecture-lab.component';
import { I18nService, Language } from './i18n/i18n.service';

const pages = [
  { path: 'home', component: HomeComponent, data: { page: 'home', titleKey: 'title.home', descriptionKey: 'meta.home' } },
  { path: 'about', component: SobreComponent, data: { page: 'about', titleKey: 'title.about', descriptionKey: 'meta.about' } },
  { path: 'experience', component: ExperienciaComponent, data: { page: 'experience', titleKey: 'title.experience', descriptionKey: 'meta.experience' } },
  { path: 'projects', component: ConquistasComponent, data: { page: 'projects', titleKey: 'title.projects', descriptionKey: 'meta.projects' } },
  { path: 'contact', component: ContatoComponent, data: { page: 'contact', titleKey: 'title.contact', descriptionKey: 'meta.contact' } },
  { path: 'lab', component: ArchitectureLabComponent, data: { page: 'lab', titleKey: 'title.lab', descriptionKey: 'meta.lab' } },
];

@Injectable({ providedIn: 'root' })
export class LanguageRouteGuard implements CanActivate {
  constructor(private readonly i18n: I18nService, private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const language = route.paramMap.get('lang');
    if (language === 'pt' || language === 'en' || language === 'es') {
      this.i18n.setLanguage(language as Language);
      return true;
    }
    return this.router.parseUrl(`/${this.i18n.language}/home`);
  }
}

@Component({ template: '' })
export class LocalizedRedirectComponent {
  constructor(route: ActivatedRoute, router: Router, i18n: I18nService) {
    const language = route.snapshot.paramMap.get('lang') || i18n.language;
    const page = route.snapshot.data['page'] || 'home';
    void router.navigateByUrl(`/${language}/${page}`, { replaceUrl: true });
  }
}

const routes: Routes = [
  { path: '', component: LocalizedRedirectComponent, pathMatch: 'full' },
  { path: ':lang', canActivate: [LanguageRouteGuard], children: [
    { path: '', component: LocalizedRedirectComponent, data: { page: 'home' }, pathMatch: 'full' },
    ...pages,
  ] },
  { path: 'home', component: LocalizedRedirectComponent, data: { page: 'home' } },
  { path: 'sobre', component: LocalizedRedirectComponent, data: { page: 'about' } },
  { path: 'about', component: LocalizedRedirectComponent, data: { page: 'about' } },
  { path: 'experiencia', component: LocalizedRedirectComponent, data: { page: 'experience' } },
  { path: 'experience', component: LocalizedRedirectComponent, data: { page: 'experience' } },
  { path: 'projetos', component: LocalizedRedirectComponent, data: { page: 'projects' } },
  { path: 'conquistas', component: LocalizedRedirectComponent, data: { page: 'projects' } },
  { path: 'projects', component: LocalizedRedirectComponent, data: { page: 'projects' } },
  { path: 'contato', component: LocalizedRedirectComponent, data: { page: 'contact' } },
  { path: 'contact', component: LocalizedRedirectComponent, data: { page: 'contact' } },
  { path: 'laboratorio', component: LocalizedRedirectComponent, data: { page: 'lab' } },
  { path: 'lab', component: LocalizedRedirectComponent, data: { page: 'lab' } },
  { path: '**', component: LocalizedRedirectComponent, data: { page: 'home' } },
];

@NgModule({ imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })], exports: [RouterModule], declarations: [LocalizedRedirectComponent] })
export class AppRoutingModule {}

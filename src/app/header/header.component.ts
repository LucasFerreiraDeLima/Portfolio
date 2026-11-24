import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { I18nService, Language } from '../i18n/i18n.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  languageModalOpen = false;
  readonly languages: { id: Language; key: string; flag: string }[] = [
    { id: 'pt', key: 'lang.pt', flag: 'PT' },
    { id: 'en', key: 'lang.en', flag: 'EN' },
    { id: 'es', key: 'lang.es', flag: 'ES' }
  ];

  constructor(public readonly i18n: I18nService, private readonly router: Router) {}

  selectLanguage(language: Language): void {
    const segments = this.router.url.split('?')[0].split('/').filter(Boolean);
    const currentPage = segments[0] === 'pt' || segments[0] === 'en' || segments[0] === 'es'
      ? segments[1] || 'home'
      : this.i18n.pageFromPath(segments[0] || 'home');
    this.i18n.setLanguage(language);
    this.languageModalOpen = false;
    void this.router.navigateByUrl(`/${language}/${currentPage}`);
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void { this.languageModalOpen = false; }
}

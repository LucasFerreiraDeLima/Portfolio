import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { I18nService } from './i18n/i18n.service';
import * as seoContent from './i18n/seo-content.json';

const PUBLIC_ORIGIN = 'https://portfolio-lucas-lima.netlify.app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio-site';

  constructor(private router: Router, private titleService: Title, private meta: Meta, private i18n: I18nService) {
    document.documentElement.lang = this.i18n.language === 'pt' ? 'pt-BR' : this.i18n.language;
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.updatePageMetadata());
    this.i18n.language$.subscribe(() => this.updatePageMetadata());
  }

  private updatePageMetadata(): void {
    let snapshot = this.router.routerState.snapshot.root;
    while (snapshot.firstChild) snapshot = snapshot.firstChild;
    const page = snapshot.data;
    if (!page?.['page']) return;

    const translations = (seoContent as Record<string, Record<string, { title: string; description: string }>>)[page['page']];
    const pageSeo = translations?.[this.i18n.language];
    if (!pageSeo) return;

    const title = pageSeo.title;
    const description = pageSeo.description;
    const canonicalUrl = `${PUBLIC_ORIGIN}${this.i18n.route(page['page'])}`;
    const imageUrl = `${PUBLIC_ORIGIN}/assets/foto-lucas.jpg`;
    const locale = this.i18n.language === 'pt' ? 'pt_BR' : this.i18n.language === 'es' ? 'es_ES' : 'en_US';

    this.titleService.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Lucas Lima — Full-Stack Developer' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:alt', content: this.i18n.translate('home.portrait') });
    this.meta.updateTag({ property: 'og:locale', content: locale });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

    this.setLink('canonical', canonicalUrl);
    const languages = [
      ['pt-BR', 'pt'], ['en', 'en'], ['es', 'es'], ['x-default', 'en'],
    ];
    languages.forEach(([hreflang, language]) => this.setLink('alternate', `${PUBLIC_ORIGIN}/${language}/${page['page']}`, hreflang));
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
    let link = document.head.querySelector<HTMLLinkElement>(selector);
    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      if (hreflang) link.hreflang = hreflang;
      document.head.appendChild(link);
    }
    link.href = href;
  }
}

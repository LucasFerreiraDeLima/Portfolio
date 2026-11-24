import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = resolve(projectRoot, 'dist/portfolio-site');
const publicOrigin = 'https://portfolio-lucas-lima.netlify.app';
const seo = JSON.parse(await readFile(resolve(projectRoot, 'src/app/i18n/seo-content.json'), 'utf8'));
const sourceHtml = await readFile(resolve(outputRoot, 'index.html'), 'utf8');
const localeTags = { pt: 'pt-BR', en: 'en', es: 'es' };

function replaceMeta(html, attribute, name, content) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const expression = new RegExp(`(<meta ${attribute}="${escapedName}" content=")[^"]*(">)`);
  return html.replace(expression, `$1${content.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}$2`);
}

for (const [page, translations] of Object.entries(seo)) {
  for (const [language, metadata] of Object.entries(translations)) {
    const pageUrl = `${publicOrigin}/${language}/${page}`;
    const imageUrl = `${publicOrigin}/assets/foto-lucas.jpg`;
    const locale = language === 'pt' ? 'pt_BR' : language === 'es' ? 'es_ES' : 'en_US';
    let html = sourceHtml.replace(/<html lang="[^"]+">/, `<html lang="${localeTags[language]}">`);
    html = html.replace(/<title>.*?<\/title>/s, `<title>${metadata.title}</title>`);
    html = replaceMeta(html, 'name', 'description', metadata.description);
    html = replaceMeta(html, 'property', 'og:title', metadata.title);
    html = replaceMeta(html, 'property', 'og:description', metadata.description);
    html = replaceMeta(html, 'property', 'og:url', pageUrl);
    html = replaceMeta(html, 'property', 'og:image', imageUrl);
    html = replaceMeta(html, 'property', 'og:locale', locale);
    html = replaceMeta(html, 'name', 'twitter:title', metadata.title);
    html = replaceMeta(html, 'name', 'twitter:description', metadata.description);
    html = replaceMeta(html, 'name', 'twitter:image', imageUrl);
    html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${pageUrl}">`);
    html = html.replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]*">/g, '');
    const alternateLinks = [
      ['pt-BR', 'pt'], ['en', 'en'], ['es', 'es'], ['x-default', 'en'],
    ].map(([hreflang, alternateLanguage]) => `<link rel="alternate" hreflang="${hreflang}" href="${publicOrigin}/${alternateLanguage}/${page}">`).join('\n  ');
    html = html.replace('<meta property="og:type" content="website">', `${alternateLinks}\n  <meta property="og:type" content="website">`);

    const pageDirectory = resolve(outputRoot, language, page);
    await mkdir(pageDirectory, { recursive: true });
    await writeFile(resolve(pageDirectory, 'index.html'), html, 'utf8');
  }
}

console.log(`Generated ${Object.keys(seo).length * Object.keys(localeTags).length} localized SEO entry pages.`);

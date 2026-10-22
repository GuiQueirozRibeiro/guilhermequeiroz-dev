# SEO e indexação

> Como o Google descobre, indexa e rankeia este portfólio, e o que cada peça de código faz.

## O problema que isso resolve

Antes desta implementação, o site era uma SPA com roteamento por hash (`#/project/:id`). O Google **ignora tudo depois do `#`** ao indexar — então toda página de projeto era invisível como URL própria; só a home era indexada. Migrar para o Next.js App Router deu ao site URLs reais por rota (`/project/agendai`), que é o pré-requisito para qualquer uma delas aparecer sozinha numa busca. O trabalho de SEO documentado aqui parte disso.

## Como o Google indexa uma página, resumido

1. **Descoberta**: o Googlebot encontra URLs via `sitemap.xml`, links internos/externos, ou submissão manual no Search Console.
2. **Rastreamento (crawling)**: baixa o HTML — e, pra sites JS-heavy como este, executa o JavaScript pra ver o DOM final (é aqui que o bug do título rolante mordia: o crawler via o `<title>` certo no HTML servido pelo servidor, mas depois de "executar" o JS via um segundo passo, o hook sobrescrevia pra o título genérico).
3. **Indexação**: guarda o conteúdo, título, descrição, imagens, dados estruturados.
4. **Ranking**: decide a posição pra cada busca, usando relevância textual, autoridade (backlinks), dados estruturados, velocidade, mobile-friendliness, etc.

## O que foi implementado

### 1. URLs reais e indexáveis
Cada projeto tem sua própria rota (`/project/<id>`), gerada estaticamente em build time via `generateStaticParams()` em `src/app/project/[id]/page.tsx`. Isso, sozinho, já é o que permite um projeto aparecer como resultado próprio no Google.

### 2. `src/app/robots.ts` → `/robots.txt`
Convenção do App Router: qualquer `robots.ts` dentro de `src/app` vira a rota `/robots.txt` automaticamente no build. Diz aos crawlers que podem indexar tudo e aponta pro sitemap:

```
User-Agent: *
Allow: /
Sitemap: https://guilhermequeiroz.dev/sitemap.xml
```

(`SITE_URL`, em `src/lib/seo.ts`, é a única fonte da verdade pro domínio — hoje `https://guilhermequeiroz.dev`, o domínio próprio, não mais o subdomínio da Vercel usado nas primeiras versões deste documento.)

### 3. `src/app/sitemap.ts` → `/sitemap.xml`
Mesma convenção, mas gera o mapa do site em XML. Lê `PROJECTS` de `src/data/projects.ts` e gera uma entrada por projeto — **sempre em dia automaticamente**: um projeto novo em `projects.ts` já aparece no sitemap sem editar este arquivo. Isso é o principal mecanismo de "descoberta" pro Google achar as páginas de projeto. Além da home e dos projetos, o sitemap também lista `/sobre` (rota estática com sua própria `generateMetadata()` em `src/app/sobre/page.tsx` — a página "além do teclado"/currículo).

### 4. `<title>` e `<meta description>` únicos por página
`generateMetadata()` (server-side, roda antes de qualquer JS do cliente) em:
- `src/app/layout.tsx` — título/descrição padrão do site (usado na home e em fallback).
- `src/app/project/[id]/page.tsx` — título (`"<Nome do Projeto> — Guilherme CCR"`) e descrição (`project.tagline.pt`) específicos de cada projeto.

**Bug corrigido**: `src/hooks/useScrollingTitle.ts` fazia um `setInterval` client-side que reescrevia `document.title` continuamente com o título genérico do site — em **qualquer** rota, inclusive projetos. Isso apagava, no navegador, o título correto que o servidor já tinha mandado. Agora o hook recebe um parâmetro `enabled` e só roda na home (`src/app/app-shell.tsx` passa `pathname === '/'`, via `usePathname()` do Next). Páginas de projeto mantêm o título estático e correto.

### 5. Canonical URLs (`alternates.canonical`)
Declarado em `layout.tsx` (aponta pra `SITE_URL`) e em `generateMetadata()` de cada projeto (aponta pra `SITE_URL/project/<id>`). Isso diz explicitamente ao Google qual é a URL "oficial" daquele conteúdo, evitando qualquer ambiguidade de conteúdo duplicado.

### 6. Open Graph / Twitter Card (prévias de compartilhamento e busca)
Cada rota define `openGraph` e `twitter` no objeto `Metadata`, incluindo `siteName` e `locale` (`OG_LOCALE`, `pt_BR` — reflete o HTML servido, ver limitação de idioma único abaixo) pra consistência entre home, `/sobre` e páginas de projeto. A imagem de prévia por projeto vem de `resolveOgImage()` em `src/lib/seo.ts`:

1. usa `project.ogImage` se você preencher esse campo em `src/data/projects.ts` (ex: `"/projects/agendai/cover.jpg"`);
2. senão, pega a primeira imagem estática da galeria do projeto (pula arquivos `.mp4` — o Google/redes sociais não geram preview de vídeo em og:image);
3. senão, cai na logo genérica do site (`OG_IMAGE`, `/logo.png`, com `OG_IMAGE_WIDTH`/`OG_IMAGE_HEIGHT` declarados pra o crawler não precisar baixar a imagem só pra medir).

A home e o fallback genérico declaram `width`/`height` do `og:image` porque o tamanho é conhecido e fixo (`/logo.png`). Para projetos, o tamanho real varia por imagem de galeria e não é rastreado em `src/data/projects.ts`, então só `url`/`alt` são declarados ali — ainda assim válido, só sem o hint de dimensão. A página `/sobre` usa `SOBRE_OG_IMAGE` (a foto paisagem "fora do código", 1152x864) em vez do retrato usado no JSON-LD `Person.image` (768x1344) — proporção retrato é recortada de forma agressiva pelos geradores de preview de link, que normalizam pra uma caixa paisagem (~1.91:1).

**Ação pendente pro usuário**: conforme for subindo as capas novas organizadas nas pastas de `public/projects/<id>/`, preencher `ogImage` em cada projeto pra ter uma prévia dedicada em vez do fallback da galeria. Vale considerar também gerar um `/logo.png` dedicado em 1200x630 (proporção 1.91:1) — hoje é um quadrado 637x637, que funciona mas não é o formato ideal recomendado pelo Facebook/LinkedIn/X para o fallback do site.

### 7. Dados estruturados (JSON-LD)
Formato que o Google usa pra entender "do que" a página trata além do texto puro — alimenta resultados ricos e ajuda buscas por entidade (nome próprio, por exemplo).

- **`Person`** (`src/app/layout.tsx`) — presente em toda página. Diz ao Google: esse site é sobre uma pessoa chamada Guilherme Queiroz Ribeiro, cargo Software Engineer, com perfis em `sameAs` (GitHub, LinkedIn, Instagram — definidos em `PERSON.sameAs`, `src/lib/seo.ts`). É o principal sinal pra ele conectar buscas como "Guilherme Queiroz Ribeiro dev fullstack" a este site especificamente, e não a outro Guilherme Queiroz Ribeiro qualquer.
- **`CreativeWork`** (`src/app/project/[id]/page.tsx`) — um por projeto: nome, descrição, imagem, ano, e `author` referenciando a mesma pessoa. Ajuda o Google a entender que aquela página é sobre um projeto/trabalho específico, feito por essa pessoa.

### 8. Favicon
`layout.tsx` referencia `/logo.svg` (ajustado manualmente pelo usuário) como ícone principal — SVG escala bem em qualquer tamanho de aba/favoritos.

### 9. Verificação do Google Search Console (pendente)
Existe um comentário em `src/app/layout.tsx` (dentro do objeto `metadata`) pronto pra receber o código de verificação:
```ts
// verification: { google: 'SEU_CODIGO_AQUI' },
```
Depois de criar a propriedade no Search Console, descomentar essa linha com o código gerado é o suficiente — não precisa subir nenhum arquivo HTML separado.

### 10. Google Analytics (GA4) — opcional, pendente
`layout.tsx` injeta o script do `gtag.js` **somente se** a env var `NEXT_PUBLIC_GA_ID` existir (via `next/script`, `strategy="afterInteractive"` — não bloqueia o carregamento da página). Sem a env var configurada, nada é carregado.

## O que falta fazer (fora do código, ações manuais)

1. Criar propriedade no [Google Search Console](https://search.google.com/search-console) para `guilhermequeiroz.dev`, colar o código de verificação em `layout.tsx`, e submeter `https://guilhermequeiroz.dev/sitemap.xml`.
2. Criar propriedade no Google Analytics (GA4), pegar o Measurement ID (`G-XXXXXXX`) e configurar `NEXT_PUBLIC_GA_ID` nas variáveis de ambiente da Vercel.
3. Preencher `ogImage` por projeto em `src/data/projects.ts` conforme as capas novas forem sendo organizadas em `public/projects/<id>/`.
4. Após indexado, monitorar no Search Console: cobertura (quantas páginas foram indexadas), performance de busca (cliques/impressões por termo) e Core Web Vitals.

## Limitação conhecida: idioma único no HTML servido

O toggle pt/en é 100% client-side (estado em `AppShell`, sem rota `/en` ou `/pt` separada). Isso significa que o HTML que o Google rastreia (`generateMetadata`) está sempre em português — não existe, hoje, uma versão da página que o Google possa indexar como "em inglês". Se buscas em inglês pelos projetos importarem no futuro, a solução correta é roteamento por locale (`/en/project/agendai`), fora do escopo desta leva de mudanças.

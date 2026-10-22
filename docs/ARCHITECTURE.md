# Arquitetura

> Documentação técnica de como o portfólio é estruturado. Reflete o código em `src/` a partir de 2026-08.

## Stack

- **Next.js 16 (App Router)** com Turbopack — SSR/SSG por rota, não é mais SPA.
- **React 19**, **TypeScript**.
- **Tailwind CSS** para estilos utilitários; algumas seções ainda usam `style={{}}` inline.
- **Framer Motion / motion** para animações.
- Deploy: **Vercel** (`SITE_URL` em `src/lib/seo.ts` aponta pra `guilhermequeiroz.dev`).

> Nota: um `CLAUDE.md` antigo neste repo descreve uma versão anterior do projeto (Vite + roteamento por hash, `index.html`, `app.tsx`). Isso não existe mais — o projeto foi migrado para Next.js App Router. Este documento reflete o estado atual.

## Roteamento

Roteamento nativo do App Router, baseado em arquivos dentro de `src/app/`:

```
src/app/
├── layout.tsx              # <html>/<head>/<body> raiz, metadata global, fontes, tema, JSON-LD, GA4
├── page.tsx                 # rota "/" — a home (client component)
├── app-shell.tsx             # shell client-side: contexto de lang/theme, Nav, Tweaks, easter eggs
├── not-found.tsx             # página 404
├── robots.ts                  # gera /robots.txt
├── sitemap.ts                  # gera /sitemap.xml
└── project/[id]/
    ├── page.tsx                # rota "/project/:id" — server component, gera metadata por projeto
    └── project-page-client.tsx  # wrapper client que renderiza <ProjectPage>
```

Cada pasta com `page.tsx` vira uma rota real (`/project/agendai`, não mais `#/project/agendai`). Isso importa para SEO: cada projeto agora tem sua própria URL indexável, em vez de tudo cair na mesma página com fragmento `#`.

## Estado global (client-side)

`AppShell` (`src/app/app-shell.tsx`) é um Client Component que envolve todo `children` vindo de `layout.tsx`. Ele guarda `lang`, `theme`, modo "cat" (easter egg) e o estado do painel de edição (`Tweaks`, usado pela integração com Claude Design). Esse estado é exposto via `AppShellContext` / hook `useAppShell()` — qualquer componente client dentro da árvore pode consumir `t` (traduções), `lang`, `theme`, `onOpenProject`, `onGoHome`.

Não existe Redux/Zustand — é Context API puro, suficiente pro tamanho do app.

## Camada de dados

`src/data/` é a fonte de verdade para conteúdo:
- `projects.ts` — `PROJECTS: Project[]`, tipado por `Project` em `src/types.ts`. Cada projeto tem textos em pt/en (`LocalizedString`), stack, galeria de imagens/vídeos, links, e opcionalmente `ogImage` (usado pra SEO — ver `docs/SEO.md`).
- `companies.ts`, `services.ts`, `stack.ts`, `highlights.ts` — mesma ideia para as outras seções.

`src/i18n.tsx` monta `I18N: Record<Lang, Translations>` (strings de UI em pt/en). `AppShell` seleciona `I18N[lang]` e repassa como prop `t` para cada seção.

## Seções (`src/sections/`)

Um arquivo por seção da home (`Hero`, `Work`, `About`, `Highlights`, `Stack`, `Services`, `Contact`, `Nav`, `Marquee`, `Tweaks`, `GithubActivity`) mais `ProjectPage.tsx` (a página de detalhe de projeto), tudo re-exportado por `src/sections/index.ts`. Recebem `t`/`lang` como props — sem contexto próprio, sem fetch de dados (tudo vem de `src/data`).

## Componentes utilitários (`src/components/`)

Componentes visuais reutilizáveis sem lógica de domínio: `GradientText`, `DecryptedText`, `SideRays`, `SpotlightCard`, `MeowOverlay` (easter egg).

## Tema

CSS custom properties definidas globalmente (`globals.css`), trocadas via atributo `data-theme` em `<html>`. Um script inline em `layout.tsx` (`THEME_INIT_SCRIPT`) roda antes da hidratação pra ler `localStorage`/preferência do sistema e já aplicar o tema certo, evitando flash de tema errado.

## SEO / metadata

Ver `docs/SEO.md` para o detalhamento completo. Resumo: `src/lib/seo.ts` centraliza constantes (`SITE_URL`, `PERSON`, `resolveOgImage`); `layout.tsx` define metadata global + JSON-LD `Person` + GA4; `project/[id]/page.tsx` define metadata e JSON-LD por projeto via `generateMetadata()`; `robots.ts`/`sitemap.ts` são convenções nativas do App Router.

## Integração "Edit Mode" (Claude Design)

`AppShell` escuta `postMessage` (`__activate_edit_mode` / `__deactivate_edit_mode`) para ligar/desligar o painel `<Tweaks>`, e envia de volta `__edit_mode_set_keys` quando `lang`/`theme` mudam. O bloco `TWEAK_DEFAULTS` em `app-shell.tsx`, delimitado por `/*EDITMODE-BEGIN*/ ... /*EDITMODE-END*/`, é o que a ferramenta de design edita diretamente.

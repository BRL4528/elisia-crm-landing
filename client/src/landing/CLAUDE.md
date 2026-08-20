# Landing comercial (`/`) — tema claro

Página de conversão criada a partir do design estático do Bruno
(`~/Downloads/elisia-landing-design-DECODIFICADO.html`, extraído do bundle offline).
Substituiu a experiência imersiva, que **continua viva em `/experiencia`** e é linkada
no rodapé (`.f-legacy`) — requisito do cliente, não remover.

## Regra que pega desavisado: o app inteiro é dark

`client/src/index.css` define tokens dark em `:root` (não em `.dark`), estiliza `html/body`
e ainda tem overrides globais para `.eyebrow`, `.mono` e para o embed `.elisia-form-embed`.
Por isso a landing:

- vive dentro de `<div className="lp">` (`pages/Landing.tsx`) e **todo** o CSS em
  `landing.css` é escopado em `.lp`, com variáveis próprias `--lp-*` — nunca reutilize os
  tokens globais aqui, eles são escuros;
- **nunca** usa classes Tailwind dentro de `.lp` (o preflight e os utilitários carregam o
  tema escuro junto); se faltar estilo, a classe nasce em `landing.css`;
- seta `document.documentElement.dataset.page = "landing"` num `useEffect` **com cleanup**
  (`html[data-page="landing"]` força fundo branco e `color-scheme: light`). Sem o cleanup,
  a rota `/experiencia` herda o tema claro;
- o `client/index.html` tem um script inline que já aplica esse atributo quando
  `pathname === "/"`, antes da primeira pintura — sem ele a landing pisca escuro.

## Mapa

- `pages/Landing.tsx` — shell: importa o CSS, aplica o tema, compõe as seções.
- `landing/content.ts` — textos, preços (`CYCLES`), features, FAQ e comparativo. Marketing
  mexe aqui, não no JSX.
- `landing/landing.css` — o design inteiro. Único lugar com CSS da landing.
- `landing/AppShot.tsx` — mock do funil, `aria-hidden` (ilustração, não é dado real).
- `landing/Contact.tsx` — reaproveita `components/ElisiaForm` (embed que cai no funil).

## Pendências conhecidas

- **Formulário de contato é de teste.** `GET api.samasc.com.br/public/forms/<id>` devolve
  `name: "teste"`, `submitLabel: "Send"` e `redirectUrl: "https://google.com.br"`. Precisa
  ser corrigido **no CRM** antes de produção — não tem conserto por código aqui.
- CSP não aplicada: `VITE_ANALYTICS_ENDPOINT` é resolvido em build-time e o `vercel.json`
  é estático (detalhes no commit dos headers).
- `index.css` mistura tokens compartilhados com estilo exclusivo da `/experiencia`; separar
  tiraria uma fatia do CSS inicial de `/`. Exige auditoria linha a linha (Privacy/Terms
  carregam eager).

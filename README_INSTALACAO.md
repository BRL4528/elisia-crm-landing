# Elisia CRM - Landing Page

Landing page profissional para o Elisia CRM, desenvolvida com React, TypeScript e shadcn/ui com tema verde.

## 🚀 Tecnologias

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS 4** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI reutilizáveis
- **Lucide React** - Ícones modernos
- **pnpm** - Gerenciador de pacotes eficiente

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 18 ou superior)
- **pnpm** (versão 8 ou superior)

Para instalar o pnpm, execute:

```bash
npm install -g pnpm
```

## 🔧 Instalação

1. **Baixe o projeto** através do checkpoint fornecido

2. **Navegue até o diretório do projeto:**

```bash
cd elisia-crm-landing
```

3. **Instale as dependências:**

```bash
pnpm install
```

## ▶️ Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
pnpm dev
```

O projeto estará disponível em: `http://localhost:3000`

## 🏗️ Build para Produção

Para criar uma versão otimizada para produção:

```bash
pnpm build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

Para visualizar a versão de produção localmente:

```bash
pnpm preview
```

## 📁 Estrutura do Projeto

```
elisia-crm-landing/
├── client/
│   ├── public/           # Arquivos estáticos
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis
│   │   │   ├── ui/      # Componentes shadcn/ui
│   │   │   └── FeatureCard.tsx
│   │   ├── pages/       # Páginas da aplicação
│   │   │   └── Home.tsx
│   │   ├── App.tsx      # Componente principal
│   │   ├── main.tsx     # Ponto de entrada
│   │   └── index.css    # Estilos globais e tema
│   └── index.html       # Template HTML
├── package.json
└── README_INSTALACAO.md
```

## 🎨 Personalização do Tema

O tema verde está configurado em `client/src/index.css`. Para personalizar as cores:

1. Abra o arquivo `client/src/index.css`
2. Modifique as variáveis CSS em `:root` e `.dark`
3. As cores principais estão definidas como `--primary`, `--secondary`, etc.

## 📝 Funcionalidades da Landing Page

- ✅ Header com navegação responsiva
- ✅ Hero section com CTA destacado
- ✅ Seção de funcionalidades principais (6 cards)
- ✅ Seção de integração com WhatsApp Business
- ✅ Seção de benefícios e diferenciais
- ✅ CTA final para conversão
- ✅ Footer completo com links
- ✅ Design responsivo mobile-first
- ✅ Tema verde personalizado
- ✅ Animações e transições suaves

## 🛠️ Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Cria build de produção
- `pnpm preview` - Visualiza o build de produção
- `pnpm lint` - Executa o linter

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através do projeto Elisia CRM.

---

**Desenvolvido com ❤️ para o Elisia CRM**

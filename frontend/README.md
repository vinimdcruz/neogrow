# NeoGrow Frontend

Interface web da aplicação **NeoGrow** desenvolvida com **Next.js**, proporcionando uma experiência intuitiva para pais de bebês prematuros acompanharem o crescimento e desenvolvimento de seus filhos.

## 🚀 Funcionalidades

- **Dashboard Interativo**: Visualização clara dos dados de crescimento
- **Gráficos Responsivos**: Curvas de crescimento com Chart.js e Recharts
- **Gestão de Bebês**: Interface para cadastro e gerenciamento de múltiplos bebês
- **Autenticação**: Sistema completo de login e registro
- **Design Responsivo**: Otimizado para desktop e mobile
- **Registro de Dados**: Formulários para inserir peso, altura e perímetro cefálico

## 🛠️ Tecnologias

- **Next.js 15** - Framework React com SSR e SSG
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS 4** - Framework CSS utility-first
- **Chart.js** - Biblioteca para gráficos interativos
- **Recharts** - Biblioteca de gráficos para React
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas TypeScript
- **React Hot Toast** - Notificações elegantes
- **React Icons** - Biblioteca de ícones
- **Date-fns** - Manipulação de datas

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── pages/               # Páginas Next.js
│   │   ├── index.tsx        # Página inicial
│   │   ├── login/           # Página de login
│   │   ├── register/        # Página de registro
│   │   ├── dashboard/       # Dashboard principal
│   │   ├── babiespage/      # Listagem de bebês
│   │   ├── registerbaby/    # Cadastro de bebês
│   │   ├── registerdetails/ # Detalhes de registro
│   │   ├── registry-table/  # Tabela de registros
│   │   ├── grafico/         # Visualização de gráficos
│   │   ├── privacyandterms/ # Termos e privacidade
│   │   ├── api/             # API routes
│   │   ├── _app.tsx         # App wrapper
│   │   └── _document.tsx    # Document customizado
│   ├── components/          # Componentes reutilizáveis
│   │   ├── container/       # Container wrapper
│   │   ├── cookiebanner/    # Banner de cookies
│   │   ├── developmentbadge/ # Badge de desenvolvimento
│   │   ├── footer/          # Rodapé
│   │   ├── header/          # Cabeçalho
│   │   ├── input/           # Componentes de input
│   │   ├── scrollup/        # Botão scroll to top
│   │   ├── sidebar/         # Barra lateral
│   │   └── termsofnotice/   # Termos de aviso
│   ├── context/             # Context API
│   │   └── authContext.tsx  # Contexto de autenticação
│   ├── assets/              # Assets estáticos
│   │   └── logo.jpg         # Logo da aplicação
│   └── styles/              # Estilos globais
│       └── globals.css      # CSS global
├── public/                  # Arquivos públicos
│   ├── favicon.ico          # Favicon
│   └── *.svg               # Ícones SVG
├── package.json             # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
├── tailwind.config.ts      # Configuração Tailwind
├── postcss.config.mjs      # Configuração PostCSS
└── next.config.ts          # Configuração Next.js
```

## 🏃‍♂️ Início Rápido

### Executando com Docker (Recomendado)

O frontend já está configurado no `docker-compose.yml` na raiz do projeto.

```bash
# Na raiz do projeto
docker compose up -d
```

A aplicação estará disponível em: http://localhost:3000

### Desenvolvimento Local

#### 1. Pré-requisitos

- Node.js 22.15.0+
- pnpm (recomendado) ou npm
- Git

#### 2. Configuração do Ambiente

```bash
# Clone o repositório (se ainda não fez)
git clone https://github.com/vinimdcruz/neogrow.git
cd neogrow/frontend

# Instale as dependências
pnpm install
# ou
npm install
```

#### 3. Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` na pasta `frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 4. Inicie o Servidor de Desenvolvimento

```bash
# Com pnpm
pnpm dev

# Com npm
npm run dev
```

A aplicação estará disponível em: http://localhost:3000

## 📱 Páginas e Funcionalidades

### 🏠 Página Inicial (`/`)
- Landing page com apresentação da aplicação
- Informações sobre funcionalidades
- Links para registro e login

### 🔐 Autenticação
- **Login** (`/login`) - Acesso à aplicação
- **Registro** (`/register`) - Cadastro de novos usuários

### 👶 Gestão de Bebês
- **Lista de Bebês** (`/babiespage`) - Visualização de todos os bebês cadastrados
- **Cadastro de Bebê** (`/registerbaby`) - Formulário para adicionar novo bebê
- **Detalhes** (`/registerdetails`) - Informações detalhadas do bebê

### 📊 Dashboard e Dados
- **Dashboard** (`/dashboard`) - Visão geral dos dados de crescimento
- **Gráficos** (`/grafico`) - Visualização de curvas de crescimento
- **Tabela de Registros** (`/registry-table`) - Histórico de medições

### ⚖️ Páginas Legais
- **Termos e Privacidade** (`/privacyandterms`) - Políticas da aplicação

## 🎨 Componentes Principais

### Layout
- **Header** - Navegação principal e menu do usuário
- **Footer** - Informações de rodapé
- **Sidebar** - Navegação lateral (dashboard)
- **Container** - Wrapper responsivo para conteúdo

### Funcionalidades
- **Input** - Componentes de formulário customizados
- **CookieBanner** - Aviso de cookies LGPD
- **DevelopmentBadge** - Indicador de ambiente de desenvolvimento
- **ScrollUp** - Botão para voltar ao topo
- **TermsOfNotice** - Avisos e termos

### Contexto
- **AuthContext** - Gerenciamento de estado de autenticação
- Controle de login/logout
- Persistência de dados do usuário
- Proteção de rotas

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Gera build de produção
pnpm start        # Inicia servidor de produção
pnpm lint         # Executa linter

# Com npm
npm run dev
npm run build
npm run start
npm run lint
```

## 🎨 Estilização

O projeto utiliza **Tailwind CSS 4** para estilização:

- **Design System**: Cores, tipografia e espaçamentos consistentes
- **Responsive Design**: Breakpoints otimizados para todas as telas
- **Dark Mode**: Suporte a tema claro/escuro (configurável)
- **Componentes**: Classes utilitárias para desenvolvimento ágil

## 📊 Gráficos e Visualizações

### Chart.js
Usado para gráficos interativos complexos:
- Curvas de crescimento
- Comparações temporais
- Métricas de desenvolvimento

### Recharts
Biblioteca específica para React:
- Gráficos responsivos nativos
- Integração simplificada
- Performance otimizada

## 🌐 Deploy

### Vercel (Recomendado)

```bash
# Deploy automático via Git
# Conecte seu repositório no painel da Vercel

# Ou via CLI
npx vercel --prod
```

### Build Manual

```bash
# Gerar build estático
pnpm build

# Iniciar servidor de produção
pnpm start
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 License

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE) para mais detalhes.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

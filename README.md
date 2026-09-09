# NeoGrow

**NeoGrow** é uma aplicação completa para auxiliar pais de bebês prematuros no acompanhamento detalhado do crescimento e desenvolvimento de seus filhos. O projeto é estruturado como um monorepo contendo frontend e backend.

## 🏗️ Estrutura do Projeto

Este monorepo contém:

- **[Backend](./backend/README.md)** - API REST desenvolvida com FastAPI
- **[Frontend](./frontend/README.md)** - Interface web desenvolvida com Next.js

## 🚀 Início Rápido

### Pré-requisitos

- Docker e Docker Compose
- Git

### Executando com Docker

1. **Clone o repositório**
   ```bash
   git clone https://github.com/vinimdcruz/neogrow.git
   cd neogrow
   ```

2. **Inicie a aplicação**
   ```bash
   docker compose up -d
   ```

3. **Acesse as aplicações**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Documentação da API: http://localhost:8000/docs

### Variáveis de ambiente

O `docker compose` já injeta valores de desenvolvimento para o backend. Para rodar o backend fora do Compose (ou em produção), copie `backend/.env.example` para `backend/.env` e preencha os valores. A variável `JWT_SECRET_KEY` é obrigatória: a API não sobe sem ela. Detalhes em [DEPLOYMENT.md](./DEPLOYMENT.md).

### Parando a aplicação

```bash
docker compose down
```

## 📚 Documentação Detalhada

Para instruções específicas de desenvolvimento, consulte os READMEs de cada projeto:

- [Documentação do Backend](./backend/README.md)
- [Documentação do Frontend](./frontend/README.md)

## 🚀 Deploy em Produção

- [Guia de Deploy Completo](./DEPLOYMENT.md) - Opções de hospedagem (Vercel gratuito, AWS S3, EC2)
- [Configuração AWS](./AWS_SETUP.md) - Instruções detalhadas para AWS

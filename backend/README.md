# NeoGrow Backend

Backend da aplicação **NeoGrow** desenvolvido com **FastAPI**, projetado para auxiliar pais de bebês prematuros no acompanhamento detalhado do crescimento e desenvolvimento de seus filhos.

## 🚀 Funcionalidades

- **Autenticação JWT**: Sistema completo de login e registro de usuários
- **Gerenciamento de Bebês**: Cadastro e gestão de informações dos bebês
- **Dados de Crescimento**: Registro de peso, altura e perímetro cefálico
- **Cálculo de Métricas**: Comparação com curvas de crescimento para prematuros
- **API RESTful**: Endpoints bem documentados com FastAPI

## 🛠️ Tecnologias

- **FastAPI** - Framework web moderno e rápido
- **SQLAlchemy** - ORM para interações com banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Alembic** - Sistema de migrações de banco
- **JWT** - Autenticação baseada em tokens
- **Pytest** - Framework de testes
- **Uvicorn** - Servidor ASGI de alta performance
- **Docker** - Containerização da aplicação

## 📁 Estrutura do Projeto

```
backend/
├── app/
│   ├── main.py              # Aplicação principal FastAPI
│   ├── models.py            # Modelos do banco de dados
│   ├── schemas.py           # Schemas Pydantic para validação
│   ├── crud.py              # Operações CRUD
│   ├── database.py          # Configuração do banco de dados
│   ├── auth/                # Sistema de autenticação
│   │   ├── jwt.py
│   │   ├── oauth2.py
│   │   └── hashing.py
│   ├── routes/              # Rotas da API
│   │   ├── auth.py
│   │   ├── baby.py
│   │   └── baby_data.py
│   ├── config/              # Configurações
│   ├── core/                # Funcionalidades centrais
│   ├── models/              # Modelos detalhados
│   ├── repositories/        # Camada de repositório
│   └── schemas/             # Schemas organizados
├── migrations/              # Migrações Alembic
├── tests/                   # Testes automatizados
├── requirements.txt         # Dependências Python
├── Dockerfile              # Configuração Docker
├── entrypoint.sh           # Script de entrada
└── alembic.ini             # Configuração Alembic
```

## 🏃‍♂️ Início Rápido

### Executando com Docker (Recomendado)

O backend já está configurado no `docker-compose.yml` na raiz do projeto.

```bash
# Na raiz do projeto
docker compose up -d
```

A API estará disponível em:
- **API**: http://localhost:8000
- **Documentação Swagger**: http://localhost:8000/docs
- **Redoc**: http://localhost:8000/redoc

### Desenvolvimento Local

#### 1. Pré-requisitos

- Python 3.12+
- PostgreSQL
- Git

#### 2. Configuração do Ambiente

```bash
# Clone o repositório (se ainda não fez)
git clone https://github.com/vinimdcruz/neogrow.git
cd neogrow/backend

# Crie e ative o ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate   # Windows

# Instale as dependências
pip install -r requirements.txt
```

#### 3. Configuração do Banco de Dados

Crie um arquivo `.env` na pasta `backend`:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/neogrow
# Obrigatória: a API não inicia sem ela. Gere com:
#   python -c "import secrets; print(secrets.token_urlsafe(32))"
JWT_SECRET_KEY=troque-por-um-valor-gerado
# Origens permitidas para CORS, separadas por vírgula
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

#### 4. Execute as Migrações

```bash
# Execute as migrações do banco
alembic upgrade head
```

#### 5. Inicie o Servidor

```bash
# Inicie o servidor de desenvolvimento
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 🔌 Endpoints Principais

### Autenticação
- `POST /api/auth/register` - Registro de novo usuário
- `POST /api/auth/login` - Login de usuário
- `GET /api/auth/me` - Dados do usuário logado

### Bebês
- `GET /api/babies` - Lista todos os bebês do usuário
- `POST /api/babies` - Cadastra novo bebê
- `GET /api/babies/{baby_id}` - Busca bebê específico
- `PUT /api/babies/{baby_id}` - Atualiza dados do bebê
- `DELETE /api/babies/{baby_id}` - Remove bebê

### Dados de Crescimento
- `GET /api/baby-data/{baby_id}` - Busca dados de crescimento
- `POST /api/baby-data` - Adiciona novo registro de crescimento
- `PUT /api/baby-data/{data_id}` - Atualiza registro
- `DELETE /api/baby-data/{data_id}` - Remove registro

### Exemplo de Payload

```json
{
  "weight": 2.5,
  "height": 45.0,
  "head_circumference": 32.0,
  "date": "2024-04-21",
  "baby_id": 1
}
```

## 🧪 Testes

```bash
# Execute todos os testes
pytest

# Execute com coverage
pytest --cov=app

# Execute testes específicos
pytest tests/test_main.py -v
```

## 🗃️ Migrações de Banco

```bash
# Criar nova migração
alembic revision --autogenerate -m "descrição da migração"

# Aplicar migrações
alembic upgrade head

# Reverter migração
alembic downgrade -1

# Histórico de migrações
alembic history
```

## 📋 Logs

Os logs da aplicação são salvos no arquivo `app.log` na raiz do backend.

```bash
# Visualizar logs em tempo real
tail -f app.log

# Logs via Docker
docker compose logs -f backend
```

## 🔧 Configurações Adicionais

### Variáveis de Ambiente

- `DATABASE_URL` - URL de conexão com o banco
- `JWT_SECRET_KEY` - Chave secreta para assinatura dos tokens JWT. Obrigatória: a aplicação não inicia sem ela (não há default). Gere com `python -c "import secrets; print(secrets.token_urlsafe(32))"`.
- `CORS_ALLOWED_ORIGINS` - Lista de origens permitidas para CORS, separada por vírgula (default de desenvolvimento: `http://localhost:3000`).

`ALGORITHM` (HS256) e `ACCESS_TOKEN_EXPIRE_MINUTES` (30) são constantes definidas em `app/auth/jwt.py`.

### CORS

As configurações de CORS estão definidas em `app/main.py`. As origens permitidas são lidas de `CORS_ALLOWED_ORIGINS` (lista separada por vírgula). Em produção, defina explicitamente os domínios do frontend; o default cobre apenas o desenvolvimento local.

## 🚀 Deploy

### Docker em Produção

```bash
# Build da imagem
docker build -t neogrow-backend .

# Executar container
docker run -p 8000:8000 --env-file .env neogrow-backend
```

### Usando Docker Compose

```bash
# Deploy completo (backend + banco)
docker compose -f docker-compose.prod.yml up -d
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 License

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE) para mais detalhes.
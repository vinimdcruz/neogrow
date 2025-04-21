# NeoGrow API

**NeoGrow API** é um backend desenvolvido com **FastAPI**, projetado para auxiliar pais de bebês prematuros no acompanhamento detalhado do crescimento e desenvolvimento de seus filhos. A API fornece endpoints para gerenciar dados do bebê, gerar gráficos de crescimento, emitir alertas e mais.

## Funcionalidades

- Cadastro de dados detalhados do bebê (peso, altura e perímetro cefálico).
- Cálculo e comparação com curvas de crescimento específicas para prematuros.
- Geração de alertas personalizados baseados em métricas de saúde.
- Integração com frontend (Next.js) para exibição de gráficos e insights.

---

## Tecnologias Utilizadas

- **FastAPI**: Framework web rápido e moderno.
- **SQLAlchemy**: ORM para interações com o banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Docker**: Containerização da aplicação.
- **Pytest**: Framework para testes.
- **Uvicorn**: Servidor ASGI de alta performance.
- **Alembic**: Ferramenta para migrações de banco de dados.

---

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- Docker e Docker Compose
- Git

---

## Instalação e Execução com Docker

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/neogrow.git
cd neogrow
```

### 2. Inicie os contêineres com Docker Compose

```bash
docker compose up -d
```

Este comando irá:
- Criar e iniciar o banco de dados PostgreSQL
- **Executar as migrações do banco de dados automaticamente**
- Iniciar o backend FastAPI na porta 8000
- Iniciar o frontend Next.js na porta 3000 (se disponível)

### 3. Verificar os logs (opcional)

```bash
docker compose logs -f backend
```

### 4. Acessar a aplicação

- API Backend: http://localhost:8000
- Documentação da API: http://localhost:8000/docs
- Frontend (se disponível): http://localhost:3000

---

## Endpoints da API

### Dados do Bebê

- `GET /api/baby`: Retorna todos os registros de dados do bebê
- `POST /api/baby`: Adiciona um novo registro com os seguintes campos:
  ```json
  {
    "weight": 2.5,
    "height": 45.0,
    "head_circumference": 32.0,
    "date": "2024-04-21"
  }
  ```

---

## Desenvolvimento Local sem Docker

Se preferir desenvolver sem Docker, siga estas etapas:

### 1. Crie e ative um ambiente virtual

```bash
python -m venv venv
source venv/bin/activate  # Para Linux/MacOS
venv\Scripts\activate     # Para Windows
```

### 2. Instale as dependências

```bash
cd backend
pip install -r requirements.txt
```

### 3. Configure o banco de dados

Crie um arquivo `.env` na pasta `backend` com:

```
DATABASE_URL=postgresql://usuario:senha@localhost:5432/neogrow
```

### 4. Execute as migrações

```bash
alembic upgrade head
```

### 5. Inicie o servidor de desenvolvimento

```bash
uvicorn app.main:app --reload
```

## Testes

### Para rodar os testes

```bash
cd backend
pytest
```

---

## Parando os Contêineres

Para parar todos os contêineres:

```bash
docker compose down
```

Para parar e remover volumes (dados do banco):

```bash
docker compose down -v
```

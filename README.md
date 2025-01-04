# NeoGrow API

**NeoGrow API** é um backend desenvolvido com **FastAPI**, projetado para auxiliar pais de bebês prematuros no acompanhamento detalhado do crescimento e desenvolvimento de seus filhos. A API fornece endpoints para gerenciar dados do bebê, gerar gráficos de crescimento, emitir alertas e mais.

## Funcionalidades

- Cadastro de dados detalhados do bebê (peso, altura, temperatura, etc.).
- Cálculo e comparação com curvas de crescimento específicas para prematuros.
- Geração de alertas personalizados baseados em métricas de saúde.
- Integração com frontend (Next.js) para exibição de gráficos e insights.

---

## Tecnologias Utilizadas

- **FastAPI**: Framework web rápido e moderno.
- **SQLAlchemy**: ORM para interações com o banco de dados.
- **Pytest**: Framework para testes.
- **Uvicorn**: Servidor ASGI de alta performance.

---

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- Python 3.9 ou superior
- Gerenciador de pacotes `pip`
- Docker (opcional, para execução com contêineres)

---

## Instalação

### 1. Crie e ative um ambiente virtual

```bash
python -m venv venv
source venv/bin/activate  # Para Linux/MacOS
venv\Scripts\activate     # Para Windows
```

### 2. Instale as dependências

```bash
pip install -r requirements.txt
```

## Execução

### 1. Iniciar o servidor de desenvolvimento

```bash
uvicorn main:app --reload

```

### 2. Acessar a documentação da API

- Documentação gerada automaticamente com Swagger: http://127.0.0.1:8000/docs
- Alternativa com Redoc: http://127.0.0.1:8000/redoc

## Testes

### Para rodar os testes

```bash
pytest
```

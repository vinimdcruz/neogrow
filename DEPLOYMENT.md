# Guia de Deploy - NeoGrow Frontend

Este guia apresenta as opções de deployment para o frontend Next.js do NeoGrow, priorizando custo-benefício.

## 🔐 Variáveis de Ambiente do Backend (Obrigatórias)

O backend faz deploy automático via `.github/workflows/deploy.yml` para EC2 e roda com `docker run --env-file backend/.env`. O arquivo `backend/.env` não é versionado e precisa existir no host EC2 antes do deploy. Use `backend/.env.example` como base.

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `JWT_SECRET_KEY` | Sim | Segredo de assinatura dos tokens JWT. A aplicação falha no boot se não estiver definida (não há default). Gere com `python -c "import secrets; print(secrets.token_urlsafe(32))"`. |
| `CORS_ALLOWED_ORIGINS` | Sim (produção) | Origens permitidas para requisições CORS, separadas por vírgula (ex.: `https://app.exemplo.com`). O default cobre apenas `http://localhost:3000`. |
| `DATABASE_URL` | Sim | URL de conexão do PostgreSQL. |

Sem `JWT_SECRET_KEY` o container não sobe; sem `CORS_ALLOWED_ORIGINS` correto o frontend é bloqueado pelo CORS.

## 📊 Comparação de Opções

| Opção | Custo Mensal | Pros | Contras |
|-------|-------------|------|---------|
| **Vercel (Free)** | **R$ 0** | Gratuito, CDN global, SSL automático | Limitação de builds/mês |
| **Netlify (Free)** | **R$ 0** | Gratuito, deploys automáticos | Menos features que Vercel |
| **AWS S3 + CloudFront** | **~R$ 5-15** | Barato, escalável | Configuração manual |
| **EC2 t2.micro** | **~R$ 45** | Controle total | Mais caro, precisa gerenciar |

## 🏆 Opção Recomendada: Vercel (GRATUITO)

### Por que Vercel?
- **100% gratuito** para projetos pessoais
- **Deploy automático** quando você faz push no GitHub
- **CDN global** - site carrega rápido em qualquer lugar
- **SSL/HTTPS automático**
- **Preview builds** para cada pull request
- **Otimizado para Next.js**

### Como fazer deploy na Vercel

#### 1. Prepare o repositório
Certifique-se que o código está no GitHub:
```bash
# Se ainda não está no GitHub
git add .
git commit -m "Preparando para deploy"
git push origin main
```

#### 2. Deploy na Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em "New Project"
4. Selecione o repositório `neogrow`
5. Configure as seguintes variáveis de ambiente:
   ```env
   NEXT_PUBLIC_API_URL=https://sua-api-backend.com
   ```
6. Clique em "Deploy"

#### 3. Configuração Automática
A Vercel detecta automaticamente que é um projeto Next.js e:
- Instala dependências
- Faz build da aplicação
- Deploy automático

#### 4. Domínio Customizado (Opcional)
- Vercel fornece domínio gratuito: `seu-projeto.vercel.app`
- Para domínio próprio: configure nas configurações do projeto

---

## 🔧 Opção 2: AWS S3 + CloudFront (Barato)

Para quem quer ficar só na AWS e ter controle total.

### Custos estimados:
- **S3**: ~R$ 1-3/mês (armazenamento)
- **CloudFront**: ~R$ 3-8/mês (CDN)
- **Route 53**: ~R$ 3/mês (DNS, opcional)
- **Total**: ~R$ 7-14/mês

### Configuração

#### 1. Build estático do Next.js
Modifique `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  output: 'export', // Para build estático
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://sua-api-backend.com',
  },
};
```

#### 2. Gerar build
```bash
cd frontend
npm run build
```

#### 3. Configurar S3 Bucket
```bash
# AWS CLI - configure primeiro: aws configure
aws s3 mb s3://neogrow-frontend
aws s3 sync out/ s3://neogrow-frontend --delete
aws s3 website s3://neogrow-frontend --index-document index.html
```

#### 4. Configurar CloudFront
- Crie distribuição CloudFront apontando para o bucket S3
- Configure SSL certificate (gratuito da AWS)
- Configure cache behaviors para otimização

### Script de Deploy Automatizado
Crie `scripts/deploy-s3.sh`:
```bash
#!/bin/bash
echo "Building Next.js app..."
cd frontend
npm run build

echo "Deploying to S3..."
aws s3 sync out/ s3://neogrow-frontend --delete --cache-control max-age=31536000
aws s3 cp out/index.html s3://neogrow-frontend/index.html --cache-control max-age=0

echo "Invalidating CloudFront..."
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

echo "Deploy completed!"
```

---

## 🖥️ Opção 3: AWS EC2 com Docker (Controle Total)

Para máximo controle, mas mais caro.

### Configuração EC2

#### 1. Instância recomendada:
- **t3.micro** (free tier por 12 meses)
- **Ubuntu 22.04 LTS**
- **20GB SSD**

#### 2. Configurar instância
```bash
# Conectar via SSH
ssh -i "sua-chave.pem" ubuntu@ip-da-instancia

# Instalar Docker
sudo apt update
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker ubuntu
# Relogar para aplicar permissões

# Clonar repositório
git clone https://github.com/vinimdcruz/neogrow.git
cd neogrow
```

#### 3. Configurar variáveis de ambiente
```bash
# Criar arquivo .env
echo "NEXT_PUBLIC_API_URL=http://seu-ip-backend:8000" > frontend/.env.production.local
```

#### 4. Deploy com Docker
```bash
# Build e executar
docker-compose up -d

# Verificar logs
docker-compose logs -f frontend
```

#### 5. Configurar SSL com Nginx (Opcional)
Crie `nginx/nginx.conf`:
```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 🔄 CI/CD Automático (GitHub Actions)

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths: ['frontend/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Build
        run: |
          cd frontend
          npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
      
      # Para Vercel (já tem integração automática)
      # Para S3
      - name: Deploy to S3
        if: github.ref == 'refs/heads/main'
        run: |
          cd frontend
          aws s3 sync out/ s3://neogrow-frontend --delete
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: us-east-1
```

---

## 🎯 Recomendação Final

**Para desenvolvimento/projeto pessoal: Use Vercel (gratuito)**
- Zero configuração
- Deploy automático
- Performance excelente
- SSL incluso

**Para produção profissional: AWS S3 + CloudFront**
- Custo baixo (~R$ 10/mês)
- Escalabilidade
- Controle total
- Integração com outros serviços AWS

**Para máximo controle: EC2 com Docker**
- Controle completo do ambiente
- Possibilidade de múltiplas aplicações
- Mais caro (~R$ 45/mês mínimo)

## ⚠️ Próximos Passos

1. **Escolha uma opção** baseada no seu orçamento
2. **Configure as variáveis de ambiente** apontando para seu backend
3. **Configure domínio** se necessário
4. **Monitore custos** (especialmente na AWS)

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs: `docker-compose logs frontend`
2. Confirme se o backend está acessível
3. Verifique variáveis de ambiente
4. Teste localmente primeiro: `npm run build && npm start`
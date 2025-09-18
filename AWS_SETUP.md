# Configurações AWS para NeoGrow

## 📝 Instruções de Configuração AWS

### 1. Configuração Inicial AWS CLI

```bash
# Instalar AWS CLI (se não tiver)
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configurar credenciais
aws configure
```

Digite:
- **Access Key ID**: Sua chave de acesso
- **Secret Access Key**: Sua chave secreta  
- **Default region**: `us-east-1` (recomendado)
- **Default output format**: `json`

### 2. Criar IAM User para Deploy

#### No Console AWS:
1. Vá para **IAM** > **Users** > **Create user**
2. Nome: `neogrow-deploy`
3. Access type: **Programmatic access**
4. Permissions: **Attach existing policies directly**
5. Adicione as políticas:
   - `AmazonS3FullAccess`
   - `CloudFrontFullAccess`
   - `AmazonEC2FullAccess` (se usar EC2)

#### Ou via CLI:
```bash
# Criar usuário
aws iam create-user --user-name neogrow-deploy

# Criar chaves de acesso
aws iam create-access-key --user-name neogrow-deploy

# Anexar políticas
aws iam attach-user-policy --user-name neogrow-deploy --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
aws iam attach-user-policy --user-name neogrow-deploy --policy-arn arn:aws:iam::aws:policy/CloudFrontFullAccess
```

---

## 🪣 Opção A: S3 + CloudFront (Recomendado - Barato)

### Passo 1: Criar S3 Bucket

```bash
# Via CLI
aws s3 mb s3://neogrow-frontend --region us-east-1

# Via Console AWS
# S3 > Create bucket > "neogrow-frontend" > us-east-1 > Create
```

### Passo 2: Configurar Bucket para Website

```bash
# Habilitar website hosting
aws s3 website s3://neogrow-frontend --index-document index.html --error-document 404.html

# Configurar política pública
cat > bucket-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::neogrow-frontend/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy --bucket neogrow-frontend --policy file://bucket-policy.json
```

### Passo 3: Criar CloudFront Distribution

#### Via Console AWS:
1. **CloudFront** > **Create Distribution**
2. **Origin domain**: `neogrow-frontend.s3-website-us-east-1.amazonaws.com`
3. **Protocol**: `HTTP only`
4. **Viewer protocol policy**: `Redirect HTTP to HTTPS`
5. **Compress objects automatically**: `Yes`
6. **Price class**: `Use only North America and Europe`
7. **SSL Certificate**: `Default CloudFront Certificate`
8. **Create Distribution**

#### Via CLI:
```bash
# Criar arquivo de configuração
cat > cloudfront-config.json << 'EOF'
{
  "CallerReference": "neogrow-$(date +%s)",
  "Comment": "NeoGrow Frontend Distribution",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "neogrow-s3-origin",
        "DomainName": "neogrow-frontend.s3-website-us-east-1.amazonaws.com",
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "http-only"
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "neogrow-s3-origin",
    "ViewerProtocolPolicy": "redirect-to-https",
    "MinTTL": 0,
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    }
  },
  "Enabled": true,
  "PriceClass": "PriceClass_100"
}
EOF

aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

### Passo 4: Deploy

```bash
# Editar script com seu Distribution ID
nano scripts/deploy-s3.sh
# Altere: CLOUDFRONT_DISTRIBUTION_ID="SEU_ID_AQUI"

# Executar deploy
./scripts/deploy-s3.sh
```

**Custo estimado: R$ 7-15/mês**

---

## 🖥️ Opção B: EC2 (Controle Total)

### Passo 1: Criar Instância EC2

#### Via Console AWS:
1. **EC2** > **Launch Instance**
2. **AMI**: Ubuntu Server 22.04 LTS
3. **Instance type**: `t3.micro` (free tier) ou `t3.small`
4. **Key pair**: Criar nova ou usar existente
5. **Security groups**: 
   - SSH (22) - Seu IP
   - HTTP (80) - 0.0.0.0/0
   - Custom (3000) - 0.0.0.0/0 (frontend)
   - Custom (8000) - 0.0.0.0/0 (backend)
6. **Storage**: 20 GB GP2
7. **Launch**

#### Via CLI:
```bash
# Criar chave SSH
aws ec2 create-key-pair --key-name neogrow-key --query 'KeyMaterial' --output text > neogrow-key.pem
chmod 400 neogrow-key.pem

# Criar security group
aws ec2 create-security-group --group-name neogrow-sg --description "NeoGrow security group"

# Adicionar regras
aws ec2 authorize-security-group-ingress --group-name neogrow-sg --protocol tcp --port 22 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name neogrow-sg --protocol tcp --port 80 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name neogrow-sg --protocol tcp --port 3000 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name neogrow-sg --protocol tcp --port 8000 --cidr 0.0.0.0/0

# Criar instância
aws ec2 run-instances \
  --image-id ami-0c02fb55956c7d316 \
  --count 1 \
  --instance-type t3.micro \
  --key-name neogrow-key \
  --security-groups neogrow-sg \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=neogrow-server}]'
```

### Passo 2: Deploy

```bash
# Obter IP da instância
EC2_IP=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=neogrow-server" --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)

# Executar deploy
./scripts/deploy-ec2.sh $EC2_IP ./neogrow-key.pem
```

**Custo estimado: R$ 45-80/mês**

---

## 🔒 SSL/HTTPS (Opcional)

### Para S3 + CloudFront:
- SSL automático via CloudFront (gratuito)
- Para domínio próprio: AWS Certificate Manager (gratuito)

### Para EC2:
```bash
# Instalar Certbot no EC2
sudo apt install certbot nginx -y

# Obter certificado (substitua seu domínio)
sudo certbot --nginx -d seudominio.com

# Configurar nginx proxy
sudo nano /etc/nginx/sites-available/default
```

---

## 💰 Estimativa de Custos (Mensais)

### S3 + CloudFront:
- **S3 Storage** (1GB): ~R$ 1
- **S3 Requests** (10k/mês): ~R$ 0.50
- **CloudFront** (10GB transfer): ~R$ 5
- **Total**: ~R$ 6.50/mês

### EC2 t3.micro:
- **Instância** (24/7): ~R$ 45
- **Storage** (20GB): ~R$ 8
- **Transfer** (1GB out): ~R$ 3
- **Total**: ~R$ 56/mês

### Free Tier (12 meses):
- **EC2**: 750h/mês gratuitas
- **S3**: 5GB gratuitos
- **CloudFront**: 50GB gratuitos
- **Total**: ~R$ 0-10/mês

---

## 🎯 Recomendação por Cenário

### Projeto Pessoal/Portfolio:
**Vercel** (gratuito) → **S3 + CloudFront** (~R$ 7/mês)

### MVP/Startup:
**S3 + CloudFront** → **EC2** quando escalar

### Aplicação Corporativa:
**EC2** com Load Balancer e Auto Scaling

---

## 🔧 Monitoramento de Custos

```bash
# Configurar billing alerts
aws budgets create-budget --account-id $(aws sts get-caller-identity --query Account --output text) --budget '{
  "BudgetName": "neogrow-monthly-budget",
  "BudgetLimit": {
    "Amount": "50.00",
    "Unit": "USD"
  },
  "TimeUnit": "MONTHLY",
  "BudgetType": "COST"
}'
```

## ❗ Importante

1. **Sempre monitore os custos** no console AWS
2. **Configure alertas de billing** 
3. **Use tags** para identificar recursos
4. **Desligar recursos** não utilizados
5. **Revisar security groups** regularmente
#!/bin/bash

# Script para deploy no EC2 via Docker
# Uso: ./scripts/deploy-ec2.sh [IP_DO_EC2] [CAMINHO_CHAVE_PEM]

set -e

if [ $# -ne 2 ]; then
    echo "Uso: $0 <IP_DO_EC2> <CAMINHO_CHAVE_PEM>"
    echo "Exemplo: $0 18.234.123.45 ~/.ssh/neogrow-key.pem"
    exit 1
fi

EC2_IP=$1
PEM_KEY=$2

echo "🚀 Deploying NeoGrow to EC2: $EC2_IP"

# Verificar se chave existe
if [ ! -f "$PEM_KEY" ]; then
    echo "❌ Chave PEM não encontrada: $PEM_KEY"
    exit 1
fi

echo "📦 Compressing project files..."
# Criar arquivo temporário com o projeto
tar -czf /tmp/neogrow.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='out' \
  --exclude='.git' \
  --exclude='__pycache__' \
  --exclude='*.log' \
  .

echo "📤 Uploading to EC2..."
scp -i "$PEM_KEY" /tmp/neogrow.tar.gz ubuntu@$EC2_IP:/tmp/

echo "🔧 Installing and deploying on EC2..."
ssh -i "$PEM_KEY" ubuntu@$EC2_IP << 'EOF'
  set -e
  
  # Atualizar sistema
  sudo apt update
  
  # Instalar Docker se não estiver instalado
  if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    sudo apt install -y docker.io docker-compose
    sudo usermod -aG docker ubuntu
    sudo systemctl start docker
    sudo systemctl enable docker
  fi
  
  # Criar diretório do projeto
  rm -rf ~/neogrow
  mkdir ~/neogrow
  cd ~/neogrow
  
  # Extrair arquivos
  tar -xzf /tmp/neogrow.tar.gz
  
  # Configurar variáveis de ambiente
  echo "NEXT_PUBLIC_API_URL=http://$IP:8000" > frontend/.env.production.local
  
  # Parar containers existentes
  docker-compose down 2>/dev/null || true
  
  # Build e executar
  echo "Building and starting containers..."
  docker-compose up -d --build
  
  # Aguardar containers iniciarem
  echo "Waiting for containers to start..."
  sleep 30
  
  # Verificar status
  docker-compose ps
  
  echo "✅ Deploy completed!"
  echo "🌐 Frontend: http://$IP:3000"
  echo "🔧 Backend API: http://$IP:8000"
  echo "📚 API Docs: http://$IP:8000/docs"
EOF

# Limpar arquivo temporário
rm /tmp/neogrow.tar.gz

echo "✅ Deploy to EC2 completed successfully!"
echo "🌐 Access your app at: http://$EC2_IP:3000"
#!/bin/bash

# Script para deploy na AWS S3 + CloudFront
# Uso: ./scripts/deploy-s3.sh

set -e  # Para o script se algum comando falhar

echo "🚀 Starting NeoGrow Frontend Deploy to AWS S3..."

# Verificar se AWS CLI está configurado
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI não está configurado. Execute: aws configure"
    exit 1
fi

# Variáveis (configure estas)
BUCKET_NAME="neogrow-frontend"
CLOUDFRONT_DISTRIBUTION_ID="E1234567890ABC"  # Substitua pelo seu ID
REGION="us-east-1"

# Ir para diretório do frontend
cd frontend

echo "📦 Installing dependencies..."
npm ci

echo "🔨 Building Next.js application..."
npm run build

# Verificar se build foi criado
if [ ! -d "out" ]; then
    echo "❌ Build failed - 'out' directory not found"
    exit 1
fi

echo "☁️  Creating S3 bucket if it doesn't exist..."
aws s3 mb s3://$BUCKET_NAME --region $REGION 2>/dev/null || echo "Bucket já existe"

echo "📤 Uploading files to S3..."
# Upload de arquivos com cache otimizado
aws s3 sync out/ s3://$BUCKET_NAME --delete \
  --cache-control "max-age=31536000" \
  --exclude "*.html" \
  --exclude "*.json"

# HTML files com cache menor (para updates rápidos)
aws s3 sync out/ s3://$BUCKET_NAME \
  --cache-control "max-age=0, must-revalidate" \
  --exclude "*" \
  --include "*.html" \
  --include "*.json"

echo "🌐 Configuring S3 bucket for static website hosting..."
aws s3 website s3://$BUCKET_NAME \
  --index-document index.html \
  --error-document 404.html

echo "🔄 Invalidating CloudFront cache..."
if [ "$CLOUDFRONT_DISTRIBUTION_ID" != "E1234567890ABC" ]; then
    aws cloudfront create-invalidation \
      --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
      --paths "/*"
    echo "✅ CloudFront invalidation created"
else
    echo "⚠️  CloudFront Distribution ID não configurado - pule a invalidação manual no console"
fi

echo "✅ Deploy completed successfully!"
echo "🌍 Site URL: https://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"

# Voltar para raiz
cd ..
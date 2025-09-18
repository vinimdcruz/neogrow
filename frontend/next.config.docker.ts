import type { NextConfig } from "next";

// Configuração específica para Docker
const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Para Docker - usar standalone
  output: 'standalone',
  
  // Configurações de imagem para Docker
  images: {
    unoptimized: true,
  },
  
  // Configurações de ambiente
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
};

export default nextConfig;
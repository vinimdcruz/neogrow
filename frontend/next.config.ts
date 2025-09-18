import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  
  // Configurações para produção e Docker
  output: 'standalone', // Para Docker otimizado
  
  // Configurações de imagem
  images: {
    unoptimized: true, // Para deployment estático se necessário
  },
  
  // Configurações de ambiente
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
};


export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  
  // Para Vercel, não usar 'standalone' - deixar padrão
  // output: 'standalone', // Só para Docker
  
  // Configurações de imagem
  images: {
    domains: [], // Adicione domínios de imagens se necessário
    unoptimized: false, // Para Vercel, deixar otimizado
  },
  
  // Proxy reverso para redirecionar /api/* para a EC2
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
  
  // Configurações de ambiente
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
};


export default nextConfig;

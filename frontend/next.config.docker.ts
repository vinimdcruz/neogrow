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
  
  // Proxy reverso para redirecionar /api/* para o backend
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL || 'http://localhost:8000'}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiPlus, FiUsers, FiHome } from "react-icons/fi";
import { Header } from "@/components/header/Header";
import { Container } from "@/components/container/Container";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { useAuth } from "@/context/authContext"; // ou '../../context/authContext'

export default function Dashboard() {
  const { signed, loading } = useAuth();
  const router = useRouter();

  // Redireciona para Home se não estiver logado
  useEffect(() => {
    if (!loading && !signed) {
      router.push("/");
    }
  }, [loading, signed, router]);

  // Enquanto carrega ou não está logado, não renderiza a página
  if (loading || !signed) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <Container>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-6">
              Painel de Controle
            </h1>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Bem-vindo!
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Utilize o painel para gerenciar os dados e acompanhar as informações registradas.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
              >
                <FiHome />
                Página de Instruções
              </Link>
            </div>

            {/* Ações */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Registrar novas informações
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Adicione informações no sistema.
                </p>
                <Link
                  href="/registerbaby"
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <FiPlus />
                  Registrar
                </Link>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Visualizar lista de registros
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Acesse a lista completa de registros.
                </p>
                <Link
                  href="/babiespage"
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <FiUsers />
                  Ver Lista
                </Link>
              </div>
            </div>

            {/* Métricas */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Visão Geral
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
                  <p className="text-sm text-gray-500 mb-1">Total de Registros</p>
                  <p className="text-2xl font-bold text-blue-600">0</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
                  <p className="text-sm text-gray-500 mb-1">Este mês</p>
                  <p className="text-2xl font-bold text-blue-600">0</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
                  <p className="text-sm text-gray-500 mb-1">Registros Pendentes</p>
                  <p className="text-2xl font-bold text-blue-600">0</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
                  <p className="text-sm text-gray-500 mb-1">Última Atualização</p>
                  <p className="text-2xl font-bold text-blue-600">24/05/2025</p>
                </div>
              </div>
            </div>
          </Container>
        </main>
      </div>
    </div>
  );
}

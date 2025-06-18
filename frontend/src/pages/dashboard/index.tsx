"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiPlus, FiUsers, FiHome } from "react-icons/fi";
import { Header } from "@/components/header/Header";
import { Container } from "@/components/container/Container";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type DashboardData = {
  total: number;
  mes: number;
  pendentes: number;
  ultimaAtualizacao: string;
};

type Itens = {
  id: number;
  createdAt: Date;
};

export default function Dashboard() {
  const { signed, loading } = useAuth();
  const router = useRouter();

  const [dashboardData, setDashboardData] = useState<DashboardData>({
    total: 0,
    mes: 0,
    pendentes: 0,
    ultimaAtualizacao: "",
  });

  const [itensPerMonth, setItensPerMonth] = useState<{ month: string; total: number }[]>([]);

  useEffect(() => {
    if (!loading && !signed) {
      router.push("/");
    }
  }, [loading, signed, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token") || localStorage.getItem("access_token");

      if (!token) {
        toast.error("Sessão expirada. Faça login novamente.");
        router.push("/");
        return;
      }

      try {
        const resBabies = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/babies/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!resBabies.ok) {
          if (resBabies.status === 401) {
            toast.error("Sessão inválida ou expirada.");
            router.push("/");
          } else {
            throw new Error("Erro inesperado ao buscar dados.");
          }
          return;
        }

        const babies = await resBabies.json();

        const babiesWithData = await Promise.all(
          babies.map(async (baby: any) => {
            const resData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/babies/${baby.id}/data/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (resData.ok) {
              const details = await resData.json();
              const last = details.length ? details[details.length - 1] : null;

              return {
                ...baby,
                hasData:
                  last?.weight !== undefined &&
                  last?.height !== undefined &&
                  last?.head_circumference !== undefined,
                createdAt: new Date(baby.created_at),
              };
            }

            return { ...baby, hasData: false, createdAt: new Date(baby.created_at) };
          })
        );

        const total = babiesWithData.length;
        const pendentes = babiesWithData.filter((b) => !b.hasData).length;
        const currentMonth = new Date().getMonth();
        const mes = babiesWithData.filter((b) => b.createdAt.getMonth() === currentMonth).length;

        // Agrupar por mês
        const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        const grouped = babiesWithData.reduce((acc: any, b: Itens) => {
          const m = b.createdAt.getMonth();
          acc[m] = (acc[m] || 0) + 1;
          return acc;
        }, {});

        const chartData = months.map((label, index) => ({
          month: label,
          total: grouped[index] || 0,
        }));

        setItensPerMonth(chartData);
        setDashboardData({ total, mes, pendentes, ultimaAtualizacao: new Date().toLocaleDateString("pt-BR") });
      } catch (err) {
        console.error("Erro ao carregar dados do dashboard:", err);
        toast.error("Erro ao carregar dados.");
      }
    };

    if (!loading && signed) {
      fetchDashboardData();
    }
  }, [loading, signed, router]);

  if (loading) return <div className="text-center mt-10">Carregando...</div>;

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
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Bem-vindo!</h2>
              <p className="text-sm text-gray-500 mb-4">
                Utilize o painel para gerenciar os dados e acompanhar as informações registradas.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
                <FiHome /> Página de Instruções
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Registrar novas informações</h2>
                <p className="text-sm text-gray-500 mb-4">Adicione informações no sistema.</p>
                <Link href="/registerbaby" className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  <FiPlus /> Registrar
                </Link>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Visualizar lista de registros</h2>
                <p className="text-sm text-gray-500 mb-4">Acesse a lista completa de registros.</p>
                <Link href="/babiespage" className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  <FiUsers /> Ver Lista
                </Link>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Visão Geral</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
                  <p className="text-sm text-gray-500 mb-1">Total de Registros</p>
                  <p className="text-2xl font-bold text-blue-600">{dashboardData.total}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
                  <p className="text-sm text-gray-500 mb-1">Este mês</p>
                  <p className="text-2xl font-bold text-blue-600">{dashboardData.mes}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
                  <p className="text-sm text-gray-500 mb-1">Registros Pendentes</p>
                  <p className="text-2xl font-bold text-blue-600">{dashboardData.pendentes}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
                  <p className="text-sm text-gray-500 mb-1">Última Atualização</p>
                  <p className="text-2xl font-bold text-blue-600">{dashboardData.ultimaAtualizacao}</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gráfico de Registros por Mês</h2>
              <div className="w-full h-96 bg-white border border-gray-200 rounded-2xl p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={itensPerMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="total" fill="#2563eb" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </Container>
        </main>
      </div>
    </div>
  );
}
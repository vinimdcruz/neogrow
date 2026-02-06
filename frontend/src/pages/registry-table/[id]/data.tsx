"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Header } from "@/components/header/Header";
import { Container } from "@/components/container/Container";
import { ScrollUp } from "@/components/scrollup/ScrollUp";
import { TermsOfUseNotice } from "@/components/termsofnotice/TermsOfUseNotice";
import { FiArrowLeft, FiTrash2, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RegistryItem {
  id: number;
  weight?: number;
  height?: number;
  head_circumference?: number;
  created_at: string;
}

interface BabyInfo {
  name: string;
  gender: string;
  birth_date: string;
}

export default function RegistryTable() {
  const router = useRouter();
  const params = useParams() as { id?: string } | null;
  const id = params?.id;

  const [items, setItems] = useState<RegistryItem[]>([]);
  const [baby, setBaby] = useState<BabyInfo | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchBabyInfo();
    fetchItems();
  }, [id]);

  const fetchBabyInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch(`/api/babies/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resp.ok) {
        const data = await resp.json();
        setBaby({ name: data.name, gender: data.gender, birth_date: data.birth_date });
      }
    } catch (err) {
      console.error("Erro ao buscar info do bebê:", err);
    }
  };

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/babies/${id}/data/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setItems(await response.json());
      } else {
        console.error("Erro ao buscar os dados.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const deleteItem = async (itemId: number) => {
    if (!confirm("Tem certeza que deseja excluir este item?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/babies/${id}/data/${itemId}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setItems(items.filter(item => item.id !== itemId));
      } else {
        alert("Erro ao excluir o item.");
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  function formatDateToBR(dateString: string): string {
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  }

  function getGenderLabel(gender: string): string {
    const g = gender.toLowerCase();
    if (g === "male") return "Masculino";
    if (g === "female") return "Feminino";
    return gender;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <TermsOfUseNotice />
      <Container>

        <div className="flex flex-col md:flex-row md:justify-between items-stretch md:items-center mt-10 space-y-2 md:space-y-0 md:space-x-4">
          <button
            onClick={() => router.push("/babiespage")}
            className="w-full md:w-auto inline-flex items-center justify-center rounded-md border bg-background px-6 py-2 text-sm font-medium shadow-sm hover:text-blue-600 transition-colors duration-300 cursor-pointer"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </button>

          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <Link
              href={`/grafico/${id}/data`}
              className="inline-flex justify-center items-center border border-blue-600 bg-blue-100 text-blue-800 px-6 py-2 text-sm rounded-md font-medium hover:bg-blue-200 transition-colors duration-300"
            >
              📈 Gráfico de Peso
            </Link>

            <button
              onClick={() => router.push(`/registerdetails/${id}/data`)}
              className="inline-flex justify-center items-center bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
            >
              <FiPlus className="mr-2" />
              Novo Registro
            </button>
          </div>
        </div>

        <div className="mt-4 mb-6 text-center">
          {baby ? (
            <>
              <h2 className="text-2xl font-semibold">{baby.name}</h2>
              <p className="text-gray-600">
                Gênero: <strong>{getGenderLabel(baby.gender)}</strong> | Nascido em:{" "}
                {formatDateToBR(baby.birth_date)}
              </p>
            </>
          ) : (
            <p>Carregando informações do bebê...</p>
          )}
        </div>

        <div className="overflow-x-auto shadow border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Altura (cm)</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Peso (kg)</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Circunferência Cabeça (cm)</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Criado em</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Nenhum registro encontrado.
                  </td>
                </tr>
              ) : (
                items.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.height ?? "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.weight ?? "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.head_circumference ?? "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="inline-flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        <FiTrash2 className="mr-1" />
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Container>
      <ScrollUp />
    </div>
  );
}

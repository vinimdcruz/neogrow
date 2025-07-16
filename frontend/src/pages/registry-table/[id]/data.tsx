"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Header } from "@/components/header/Header";
import { Container } from "@/components/container/Container";
import { ScrollUp } from "@/components/scrollup/ScrollUp";
import { TermsOfUseNotice } from "@/components/termsofnotice/TermsOfUseNotice";
import { FiArrowLeft, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

interface RegistryItem {
  id: number;
  weight?: number;
  height?: number;
  head_circumference?: number;
  created_at: string;
}

export default function RegistryTable() {
  const router = useRouter();
  const { id } = useParams(); // pegar id do bebê da URL

  const [items, setItems] = useState<RegistryItem[]>([]);

  useEffect(() => {
    if (!id) return; // aguarda id disponível
    fetchItems();
  }, [id]);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/babies/${id}/data/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        console.error("Erro ao buscar os dados.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const deleteItem = async (itemId: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir este item?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registry/${itemId}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setItems(items.filter((item) => item.id !== itemId));
      } else {
        alert("Erro ao excluir o item.");
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <TermsOfUseNotice />
      <Container>
        <div className="flex flex-col md:flex-row md:justify-between items-stretch md:items-center mt-3 space-y-2 md:space-y-0 md:space-x-4">
          <button
            onClick={() => router.push("/babiespage")}
            className="w-full md:w-auto inline-flex items-center justify-center rounded-md border bg-background px-6 py-2 text-sm font-medium shadow-sm hover:text-blue-600 transition-colors duration-300 cursor-pointer"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </button>

          <button
            onClick={() => router.push(`/registerdetails/${id}/data`)}
            className="w-full md:w-auto inline-flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
          >
            <FiPlus className="mr-2" />
            Novo Registro
          </button>
        </div>

        <h1 className="text-xl font-bold text-gray-700 mb-6 mt-6 text-center">Tabela de Registros 📋</h1>

        <div className="overflow-x-auto shadow border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Altura (cm)</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Peso (kg)</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Circunferência da Cabeça (cm)</th>
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
                items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.height ?? "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.weight ?? "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.head_circumference ?? "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => router.push(`/registry-table/${item.id}/edit`)}
                        className="inline-flex items-center px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                      >
                        <FiEdit className="mr-1" /> Editar
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="inline-flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        <FiTrash2 className="mr-1" /> Excluir
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

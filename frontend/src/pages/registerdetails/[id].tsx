"use client";

import { Header } from "@/components/header/Header";
import { Container } from "@/components/container/Container";
import { CookieBanner } from "@/components/cookiebanner/CookieBanner";
import { TermsOfUseNotice } from "@/components/termsofnotice/TermsOfUseNotice";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

interface BabyDataForm {
  weight: string;
  height: string;
  head_circumference: string;
}

export default function RegisterDetails() {
  const router = useRouter();
  const { id } = router.query;

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState<BabyDataForm>({
    weight: "",
    height: "",
    head_circumference: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!/^\d*\.?\d{0,2}$/.test(value)) return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || typeof id !== "string" || isNaN(Number(id))) {
      alert("ID do bebê inválido na URL.");
      return;
    }

    const token = localStorage.getItem("token") || localStorage.getItem("access_token");

    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      return;
    }

    const weight = parseFloat(form.weight);
    const height = parseFloat(form.height);
    const head = parseFloat(form.head_circumference);

    if (
      isNaN(weight) || weight <= 0 ||
      isNaN(height) || height <= 0 ||
      isNaN(head) || head <= 0
    ) {
      alert("Preencha todos os campos com valores válidos maiores que zero.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/babies/${id}/data/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          weight,
          height,
          head_circumference: head,
          date: today,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Dados registrados com sucesso!");
        router.push("/babiespage");
      } else {
        console.error("Erro da API:", data);
        alert("Erro ao registrar: " + (data.detail || "Erro desconhecido."));
      }
    } catch (error) {
      console.error("Erro de requisição:", error);
      alert("Erro ao registrar.");
    }
  };

  return (
    <>
      <div className="h-screen bg-white overflow-hidden">
        <Header />
        <TermsOfUseNotice />
        <CookieBanner />
        <Container>
          <div className="h-full p-4 md:p-6 flex flex-col">
            <button
              onClick={() => router.push("/babiespage")}
              className="self-start h-9 inline-flex items-center justify-center rounded-md border bg-background px-6 py-2 text-sm font-medium shadow-sm mb-8 cursor-pointer hover:text-blue-600 transition-colors duration-300"
            >
              <FiArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </button>

            <div className="flex flex-1 items-center justify-center">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg space-y-6 bg-white border border-blue-200 rounded-xl p-8 shadow-md hover:shadow-lg transition"
              >
                <div className="text-center">
                  <h2 className="text-xl font-bold text-blue-600 mb-1">Adicionar Informações</h2>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="height" className="text-sm font-medium text-gray-700">Altura (cm)</label>
                  <input
                    id="height"
                    type="number"
                    step="0.01"
                    min="0.01"
                    name="height"
                    placeholder="0.01"
                    value={form.height}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="weight" className="text-sm font-medium text-gray-700">Peso (kg)</label>
                  <input
                    id="weight"
                    type="number"
                    step="0.01"
                    min="0.01"
                    name="weight"
                    placeholder="0.01"
                    value={form.weight}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="head_circumference" className="text-sm font-medium text-gray-700">Circunferência da Cabeça (cm)</label>
                  <input
                    id="head_circumference"
                    type="number"
                    step="0.01"
                    min="0.01"
                    name="head_circumference"
                    placeholder="0.01"
                    value={form.head_circumference}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-2 rounded-md font-medium transition"
                >
                  Salvar Dados
                </button>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

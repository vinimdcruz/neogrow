"use client";

import { Header } from "@/components/header/Header";
import { Container } from "@/components/container/Container";
import { CookieBanner } from "@/components/cookiebanner/CookieBanner";
import { TermsOfUseNotice } from "@/components/termsofnotice/TermsOfUseNotice";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const regex = /^\d+\.\d{2}$/;
    setIsValid(
      regex.test(form.weight) &&
      regex.test(form.height) &&
      regex.test(form.head_circumference)
    );
  }, [form]);

  const formatToDecimal = (value: string): string => {
    // Remove tudo que não for número
    const cleaned = value.replace(/\D/g, "").slice(0, 5); // limite para 5 dígitos (ex: 999.99)

    if (cleaned.length === 0) return "";

    const padded = cleaned.padStart(3, "0");
    const beforeDot = padded.slice(0, padded.length - 2);
    const afterDot = padded.slice(-2);

    return `${parseInt(beforeDot, 10)}.${afterDot}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formatted = formatToDecimal(value);

    setForm((prev) => ({
      ...prev,
      [name]: formatted,
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

    const { weight, height, head_circumference } = form;

    const weightFloat = parseFloat(weight);
    const heightFloat = parseFloat(height);
    const headFloat = parseFloat(head_circumference);

    if (
      isNaN(weightFloat) || weightFloat <= 0 ||
      isNaN(heightFloat) || heightFloat <= 0 ||
      isNaN(headFloat) || headFloat <= 0
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
          weight: weightFloat,
          height: heightFloat,
          head_circumference: headFloat,
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
    <div className="h-screen bg-white overflow-hidden">
      <Header />
      <TermsOfUseNotice />
      <CookieBanner />
      <Container>
        <div className="h-full p-4 md:p-6 flex flex-col">
          <div className="flex mt-3 justify-center md:justify-start">
            <button
              onClick={() => router.push("/babiespage")}
              className="self-start h-9 inline-flex items-center justify-center rounded-md border bg-background px-40 md:px-8 py-2 text-sm font-medium shadow-sm mb-10 cursor-pointer hover:text-blue-600 transition-colors duration-300"
            >
              <FiArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </button>
          </div>

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
                  type="text"
                  inputMode="numeric"
                  name="height"
                  placeholder="0.00"
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
                  type="text"
                  inputMode="numeric"
                  name="weight"
                  placeholder="0.00"
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
                  type="text"
                  inputMode="numeric"
                  name="head_circumference"
                  placeholder="0.00"
                  value={form.head_circumference}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className={`w-full py-2 rounded-md font-medium transition ${
                  isValid
                    ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Salvar Dados
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

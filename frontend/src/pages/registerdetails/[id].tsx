"use client";

import { Header } from "@/components/header/Header";
import { Container } from "@/components/container/Container";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

interface BabyForm {
  weight: string;
  height: string;
  head_circumference: string;
}

export default function RegisterDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const today = new Date().toISOString().split("T")[0]; // Data de hoje

  const [form, setForm] = useState<BabyForm>({
    weight: "",
    height: "",
    head_circumference: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Apliquei essa Regex que impede valores negativos ou com mais de 2 casas decimais
    if (!/^\d*\.?\d{0,2}$/.test(value)) return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      return;
    }

    const weight = parseFloat(Number(form.weight).toFixed(2));
    const height = parseFloat(Number(form.height).toFixed(2));
    const head = parseFloat(Number(form.head_circumference).toFixed(2));

    if (
      isNaN(weight) || weight <= 0 ||
      isNaN(height) || height <= 0 ||
      isNaN(head) || head <= 0
    ) {
      alert("Preencha todos os campos com valores válidos e maiores que zero.");
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

      if (res.ok) {
        alert("Registro salvo com sucesso!");
        router.push("/babiespage");
      } else {
        const error = await res.json();
        alert("Erro ao registrar: " + (error.detail || "Erro desconhecido"));
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao registrar.");
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div className="h-full bg-white p-4 md:p-6 overflow-auto">
          <button
            onClick={() => router.push("/babiespage")}
            className="self-start h-9 inline-flex items-center justify-center rounded-md border bg-background px-6 py-2 text-sm font-medium shadow-sm mb-40 cursor-pointer hover:text-blue-600 transition-colors duration-300"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </button>

          <div className="flex-grow flex items-center justify-center overflow-hidden">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md space-y-4 border border-blue-200 rounded-lg p-6 shadow-md bg-white transition-all hover:border-blue-400 hover:shadow-lg"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 text-center rounded-lg">
                <h2 className="text-base font-semibold text-white">
                  Nome: {id}
                </h2>
              </div>

              <input
                type="number"
                step="0.01"
                min="0.01"
                name="height"
                placeholder="Altura (cm)"
                value={form.height}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />

              <input
                type="number"
                step="0.01"
                min="0.01"
                name="weight"
                placeholder="Peso (kg)"
                value={form.weight}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />

              <input
                type="number"
                step="0.01"
                min="0.01"
                name="head_circumference"
                placeholder="Circunferência da Cabeça (cm)"
                value={form.head_circumference}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
              >
                Salvar Registro
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}

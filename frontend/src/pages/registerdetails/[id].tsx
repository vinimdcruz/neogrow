"use client";

import { Header } from "@/components/header/Header";
import { Container } from "@/components/container/Container";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft } from 'react-icons/fi'

interface BabyForm {
  name: string;
  date: string;
  weight: string;
  height: string;
  head_circumference: string;
}

export default function BabyRegister() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [form, setForm] = useState<BabyForm>({
    name: "",
    date: "",
    weight: "",
    height: "",
    head_circumference: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/teste", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          date: form.date,
          weight: parseFloat(form.weight),
          height: parseFloat(form.height),
          head_circumference: parseFloat(form.head_circumference),
        }),
      });

      if (res.ok) {
        alert("Registro salvo com sucesso!");
        router.push("/babylist");
      } else {
        alert("Erro ao registrar.");
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
            onClick={() => router.push("/babylist")}
            className="self-start h-9 inline-flex items-center justify-center rounded-md border bg-background px-6 py-2 text-sm font-medium shadow-sm mb-40 cursor-pointer hover:text-blue-600 transition-colors duration-300"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </button>

          <div className="flex-grow flex items-center justify-center overflow-hidden">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md space-y-4 border border-blue-200 rounded-lg p-6 shadow-md bg-white shadow-md transition-all hover:border-blue-400 hover:shadow-lg"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-center overflow-hidden rounded-lg">
                  <h2 className="text-base font-semibold text-white">
                     {form.name ? `${form.name}` : `${id}`}
                  </h2>
              </div>

              <input
                type="number"
                step="0.1"
                name="height"
                placeholder="Altura (cm)"
                value={form.height}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />

              <input
                type="number"
                step="0.1"
                name="weight"
                placeholder="Peso (kg)"
                value={form.weight}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />

              <input
                type="number"
                step="0.1"
                name="head_circumference"
                placeholder="Circunferência da Cabeça (cm)"
                value={form.head_circumference}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md cursor-pointer"
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

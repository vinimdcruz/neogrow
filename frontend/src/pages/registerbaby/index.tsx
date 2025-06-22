"use client";

import { Header } from "@/components/header/Header";
import { Container } from "@/components/container/Container";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

interface BabyFormProps {
  name: string;
  birth_date: string;
}

export default function RegisterBaby() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [form, setForm] = useState<BabyFormProps>({
    name: "",
    birth_date: "",
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
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Você não está autenticado.");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/babies/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          birth_date: form.birth_date,
        }),
      });

      const data = await res.json();
      console.log("Status da resposta:", res.status);
      console.log("Corpo da resposta:", data);

      if (res.ok) {
        alert("Registro salvo com sucesso!");
        router.push("/babiespage");
      } else {
        alert("Erro ao registrar: " + (data?.detail || "Erro desconhecido."));
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
      alert("Erro inesperado ao registrar.");
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div className="h-full bg-white p-4 md:p-6 overflow-auto">
          <button
            onClick={() => router.push("/dashboard")}
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
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 text-center overflow-hidden rounded-lg">
                <h2 className="text-base font-semibold text-white">
                  Registrar Informação
                </h2>
              </div>

              <input
                type="text"
                name="name"
                placeholder="Adicione o nome"
                autoComplete="off"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />

              <input
                type="date"
                name="birth_date"
                value={form.birth_date}
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

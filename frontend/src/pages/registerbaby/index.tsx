"use client";

import { Header } from "@/components/header/Header";
import { Container } from "@/components/container/Container";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { TermsOfUseNotice } from "@/components/termsofnotice/TermsOfUseNotice";

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
      <TermsOfUseNotice />
      <Container>
        <div className="h-screen p-4 md:p-6 flex flex-col">
          <button
            onClick={() => router.push("/dashboard")}
            className="self-start h-9 inline-flex items-center justify-center rounded-md border bg-background px-6 py-2 text-sm font-medium shadow-sm mb-10 cursor-pointer hover:text-blue-600 transition-colors duration-300"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </button>

          <div className="mt-30 flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg space-y-6 bg-white border border-blue-200 rounded-xl p-8 shadow-md hover:shadow-lg transition"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold text-blue-600 mb-1">Registrar Informações</h2>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome ou apelido</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Digite o nome ou apelido"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="birth_date" className="text-sm font-medium text-gray-700">Data de nascimento</label>
                <input
                  id="birth_date"
                  type="date"
                  name="birth_date"
                  value={form.birth_date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer py-2 rounded-md font-medium transition"
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

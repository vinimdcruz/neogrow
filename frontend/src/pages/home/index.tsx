"use client";

import { Header } from "@/components/header/Header";
import { Container } from "@/components/container/Container";
import { useState, useEffect } from "react";
import { FiUserPlus } from "react-icons/fi";
import Link from "next/link"

interface babyProps {
  id: number;
  name: string;
  date: string; // Será formatada para "dd/MM/yyyy"
  weight: number;
  height: number;
  head_circumference: number;
}

export default function Home() {
  const [babies, setBabies] = useState<babyProps[]>([]);

  useEffect(() => {
    async function fetchBabies() {
      try {
        const res = await fetch("/api/teste");
        const data = await res.json();
        setBabies(data);
      } catch (error) {
        console.error("Erro ao buscar dados do bebê:", error);
      }
    }

    fetchBabies();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Container>
        <section className="h-full bg-white p-4 md:p-6 overflow-auto">
          <header className="mb-8 text-center">
            <h1 className="text-xl font-bold text-gray-600">
              Minha Lista de Informações
            </h1>
          </header>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {babies.map((baby) => (
              <div
                key={baby.id}
                className="overflow-hidden rounded-lg border border-blue-200 bg-white shadow-md transition-all hover:border-blue-400 hover:shadow-lg"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4">
                  <h2 className="text-base font-semibold text-white">
                    {baby.name}
                  </h2>
                </div>

                <div className="p-4">
                    <div className="mb-2 text-gray-700 text-sm">
                        <p className="font-bold mb-1">Nascimento:</p>
                        <p className="text-gray-700 text-sm">{new Date(baby.date).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <div className="mb-2 text-gray-700 text-sm">
                        <p className="font-bold mb-1">Peso (kg):</p>
                        <p className="text-gray-700 text-sm">{baby.weight}</p>
                    </div>
                    <div className="mb-2 text-gray-700 text-sm">
                        <p className="font-bold mb-1">Altura (cm):</p>
                        <p className="text-gray-700 text-sm">{baby.height}</p>
                    </div>
                    <div className="mb-2 text-gray-700 text-sm">
                        <p className="font-bold mb-1">Circunferência da Cabeça (cm):</p>
                        <p className="text-gray-700 text-sm">{baby.head_circumference}</p>
                    </div>
                    <button className="w-full inline-flex justify-center mt-1 rounded-md border bg-background px-2 py-2 text-sm font-medium shadow-sm cursor-pointer hover:text-blue-600 transition-all duration-300">
                        <Link href={`/registerbaby/${baby.id}`} className="flex items-center w-full justify-center">
                          <FiUserPlus className="h-4 w-4 mr-2" />
                          Registrar Informações
                        </Link>
                    </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}

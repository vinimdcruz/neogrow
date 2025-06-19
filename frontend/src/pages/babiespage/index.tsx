"use client";

import { Header } from "@/components/header/Header";
import { Container } from "@/components/container/Container";
import { useState, useEffect } from "react";
import { FiEdit, FiArrowLeft } from "react-icons/fi";
import { TermsOfUseNotice } from "@/components/termsofnotice/TermsOfUseNotice";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface babyProps {
  id: number;
  name: string;
  birth_date: string;
  weight?: number;
  height?: number;
  head_circumference?: number;
}

export default function BabyList() {
  const [babies, setBabies] = useState<babyProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchBabiesWithData() {
      try {
        const token = localStorage.getItem("token");
        const resBabies = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/babies/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const babiesData = await resBabies.json();

        const babiesWithDetails = await Promise.all(
          babiesData.map(async (baby: babyProps) => {
            const resDetails = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/babies/${baby.id}/data/`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (resDetails.ok) {
              const details = await resDetails.json();
              // Pega o registro mais recente, ou vazio se não houver
              const latest = details.length ? details[details.length - 1] : {};
              return {
                ...baby,
                weight: latest.weight,
                height: latest.height,
                head_circumference: latest.head_circumference,
              };
            }
            return baby;
          })
        );

        setBabies(babiesWithDetails);
      } catch (error) {
        console.error("Erro ao buscar dados do bebê:", error);
      }
    }

    fetchBabiesWithData();
  }, []);

  const hasData = (baby: babyProps) => {
    return (
      baby.weight !== undefined && baby.weight !== null &&
      baby.height !== undefined && baby.height !== null &&
      baby.head_circumference !== undefined && baby.head_circumference !== null
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <TermsOfUseNotice />
      <Container>
        <section className="h-full p-4 md:p-6 overflow-auto">
          <button
            onClick={() => router.push("/dashboard")}
            className="self-start h-9 inline-flex items-center justify-center rounded-md border bg-background px-6 py-2 text-sm font-medium shadow-sm mb-10 cursor-pointer hover:text-blue-600 transition-colors duration-300"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </button>

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
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex justify-between items-center">
                  <h2 className="text-base font-semibold text-white">{baby.name}</h2>
                </div>

                <div className="p-4">
                  {baby.birth_date && (
                    <div className="mb-2 text-gray-700 text-sm">
                      <p className="font-bold mb-1">Nascimento:</p>
                      <p>{new Date(baby.birth_date).toLocaleDateString("pt-BR")}</p>
                    </div>
                  )}

                  {baby.weight !== undefined && baby.weight !== null && (
                    <div className="mb-2 text-gray-700 text-sm">
                      <p className="font-bold mb-1">Peso (kg):</p>
                      <p>{baby.weight}</p>
                    </div>
                  )}

                  {baby.height !== undefined && baby.height !== null && (
                    <div className="mb-2 text-gray-700 text-sm">
                      <p className="font-bold mb-1">Altura (cm):</p>
                      <p>{baby.height}</p>
                    </div>
                  )}

                  {baby.head_circumference !== undefined && baby.head_circumference !== null && (
                    <div className="mb-2 text-gray-700 text-sm">
                      <p className="font-bold mb-1">Circunferência da Cabeça (cm):</p>
                      <p>{baby.head_circumference}</p>
                    </div>
                  )}
                  

                  <button
                    className={`w-full inline-flex justify-center mt-1 rounded-md border bg-background px-2 py-2 text-sm font-medium shadow-sm cursor-pointer transition-all duration-300
                      ${hasData(baby) ? "cursor-not-allowed text-gray-400 border-gray-300" : "hover:text-blue-600 border"}
                    `}
                    disabled={hasData(baby)}
                  >
                    <Link
                      href={`/registerdetails/${baby.id}/data`}
                      className="flex items-center w-full justify-center"
                      tabIndex={hasData(baby) ? -1 : 0}
                      onClick={e => hasData(baby) && e.preventDefault()}
                    >
                      <FiEdit className="h-4 w-4 mr-2" />
                      Adicionar Informações
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

"use client";

import { Header } from "@/components/header/Header";
import { Container } from "@/components/container/Container";
import { ScrollUp } from "../../components/scrollup/ScrollUp";
import { useState, useEffect } from "react";
import { FiEdit, FiArrowLeft } from "react-icons/fi";
import { TermsOfUseNotice } from "@/components/termsofnotice/TermsOfUseNotice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';


interface babyProps {
  id: number;
  name: string;
  birth_date: string;
  weight?: number;
  height?: number;
  head_circumference?: number;
  gender: string;
  date?: string;
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
        console.debug("Dados recebidos da API:", babiesData);

        const babiesWithDetails = await Promise.all(
          babiesData.map(async (baby: babyProps) => {
            const resDetails = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/babies/${baby.id}/data/`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (resDetails.ok) {
              const details = await resDetails.json();
              const latest = details.length ? details[details.length - 1] : {};

              let updatedDate = baby.date || "";

              if (latest.data_points && Array.isArray(latest.data_points) && latest.data_points.length > 0) {
                const lastDataPoint = latest.data_points[latest.data_points.length - 1];
                updatedDate = lastDataPoint.updated_at || lastDataPoint.date || updatedDate;
              } else {
                updatedDate = latest.updated_at || latest.date || updatedDate;
              }

              return {
                ...baby, 
                weight: latest.weight,
                height: latest.height,
                head_circumference: latest.head_circumference,
                date: updatedDate,
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
      baby.weight !== undefined &&
      baby.weight !== null &&
      baby.height !== undefined &&
      baby.height !== null &&
      baby.head_circumference !== undefined &&
      baby.head_circumference !== null
    );
  };

  function formatDateToBR(dateString: string): string {
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  }

  function getGenderLabel(gender: string) {
    if (!gender) return "-";
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
        <section className="h-full p-0 md:p-6 overflow-auto">
          <div className="flex mt-1 justify-center md:justify-start">
            <button
              onClick={() => router.push("/dashboard")}
              className="self-start h-9 inline-flex items-center justify-center rounded-md border bg-background px-40 mt-5 mb-1 md:px-8 py-4 text-sm font-medium shadow-sm mb-10 cursor-pointer hover:text-blue-600 transition-colors duration-300"
            >
              <FiArrowLeft className="h-4 w-3 mr-2" />
              Voltar
            </button>
          </div>

          <header className="mb-9 text-center">
            <h1 className="text-xl font-bold text-gray-600">
              Itens registrados 📝
            </h1>
          </header>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {babies.map((baby) => (
              <div
                key={baby.id}
                className="overflow-hidden rounded-lg border border-blue-200 bg-white shadow-md transition-all hover:border-blue-400 hover:shadow-lg"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex justify-between items-center">
                  <h2 className="text-base font-semibold text-white">
                    {baby.name} - Nascido em: {formatDateToBR(baby.birth_date)}
                  </h2>
                </div>

                <div className="p-4">
                  <div className="mb-2 text-gray-700 text-sm">
                    <p className="font-bold mb-1">Gênero:</p>
                    <p>{getGenderLabel(baby.gender)}</p>
                  </div>

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

                  {baby.head_circumference !== undefined && baby.head_circumference !== null ? (
                    <div className="mb-2 text-gray-700 text-sm">
                      <p className="font-bold mb-1">Circunferência da Cabeça (cm):</p>
                      <p>{baby.head_circumference}</p>
                    </div>
                  ) : (
                    <p className="text-center text-sm">Por favor, adicione as informações.</p>
                  )}

                  {baby.date && (
                    <div className="mb-2 text-gray-700 text-sm">
                      <p className="font-bold mb-1">Cadastrado em 📆 :</p>
                      <p>{formatDateToBR(baby.date)}</p>
                    </div>
                  )}

                  {hasData(baby) ? (
                    <div className="flex flex-col gap-2 mt-3">
                      <Link
                        href={`/registry-table/${baby.id}/data`}
                        className="w-full inline-flex justify-center rounded-md border border-green-600 bg-green-100 px-3 py-2 text-sm font-medium text-green-800 hover:bg-green-200 transition-all duration-300"
                      >
                        📋 Visualizar todas as informações cadastradas
                      </Link>
                      <Link
                        href={`/grafico/${baby.id}/data`}
                        className="w-full inline-flex justify-center rounded-md border border-blue-600 bg-blue-100 px-3 py-2 text-sm font-medium text-blue-800 hover:bg-blue-200 transition-all duration-300"
                      >
                        📈 Visualizar Gráfico de Peso
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={`/registry-table/${baby.id}/data`}
                      className="w-full inline-flex justify-center mt-3 rounded-md border border-green-600 bg-green-100 px-3 py-2 text-sm font-medium text-green-800 hover:bg-green-200 transition-all duration-300"
                    >
                      <FiEdit className="h-4 w-4 mr-2" />
                      Adicionar Informações
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
      <ScrollUp />
    </div>
  );
}

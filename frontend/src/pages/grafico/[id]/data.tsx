"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Header } from "@/components/header/Header";
import { Container } from "@/components/container/Container";
import { TermsOfUseNotice } from "@/components/termsofnotice/TermsOfUseNotice";
import { FiArrowLeft } from "react-icons/fi";

interface DataPoint {
  date: string;
  weight?: number;
}

interface RegistryItem {
  id: number;
  weight?: number;
  date: string;
}

type Gender = "male" | "female";

const weightWHO_male = [
  { month: 1, minus2: 3.3, normal: 4.5, plus2: 5.7 },
  { month: 2, minus2: 4.0, normal: 5.6, plus2: 7.1 },
  { month: 3, minus2: 4.5, normal: 6.4, plus2: 8.0 },
  { month: 4, minus2: 4.9, normal: 7.0, plus2: 8.6 },
  { month: 5, minus2: 5.2, normal: 7.6, plus2: 9.2 },
  { month: 6, minus2: 5.5, normal: 7.9, plus2: 9.6 },
  { month: 7, minus2: 5.7, normal: 8.3, plus2: 10.0 },
  { month: 8, minus2: 5.9, normal: 8.6, plus2: 10.3 },
  { month: 9, minus2: 6.0, normal: 8.9, plus2: 10.6 },
  { month: 10, minus2: 6.2, normal: 9.2, plus2: 10.8 },
  { month: 11, minus2: 6.3, normal: 9.4, plus2: 11.0 },
  { month: 12, minus2: 6.4, normal: 9.6, plus2: 11.2 },
  { month: 13, minus2: 6.5, normal: 9.8, plus2: 11.4 },
  { month: 14, minus2: 6.6, normal: 10.0, plus2: 11.6 },
  { month: 15, minus2: 6.7, normal: 10.1, plus2: 11.7 },
  { month: 16, minus2: 6.8, normal: 10.3, plus2: 11.9 },
  { month: 17, minus2: 6.9, normal: 10.4, plus2: 12.0 },
  { month: 18, minus2: 7.0, normal: 10.5, plus2: 12.1 },
  { month: 19, minus2: 7.1, normal: 10.7, plus2: 12.3 },
  { month: 20, minus2: 7.2, normal: 10.8, plus2: 12.4 },
  { month: 21, minus2: 7.3, normal: 10.9, plus2: 12.5 },
  { month: 22, minus2: 7.4, normal: 11.0, plus2: 12.6 },
  { month: 23, minus2: 7.5, normal: 11.1, plus2: 12.7 },
  { month: 24, minus2: 7.6, normal: 12.2, plus2: 13.5 },
];

const weightWHO_female = [
  { month: 1, minus2: 3.2, normal: 4.2, plus2: 5.4 },
  { month: 2, minus2: 3.7, normal: 5.1, plus2: 6.4 },
  { month: 3, minus2: 4.2, normal: 5.8, plus2: 7.1 },
  { month: 4, minus2: 4.6, normal: 6.3, plus2: 7.7 },
  { month: 5, minus2: 4.9, normal: 6.7, plus2: 8.1 },
  { month: 6, minus2: 5.1, normal: 7.0, plus2: 8.5 },
  { month: 7, minus2: 5.3, normal: 7.3, plus2: 8.8 },
  { month: 8, minus2: 5.5, normal: 7.5, plus2: 9.1 },
  { month: 9, minus2: 5.6, normal: 7.7, plus2: 9.3 },
  { month: 10, minus2: 5.8, normal: 7.9, plus2: 9.5 },
  { month: 11, minus2: 5.9, normal: 8.0, plus2: 9.7 },
  { month: 12, minus2: 6.0, normal: 8.2, plus2: 9.8 },
  { month: 13, minus2: 6.1, normal: 8.3, plus2: 9.9 },
  { month: 14, minus2: 6.2, normal: 8.4, plus2: 10.1 },
  { month: 15, minus2: 6.3, normal: 8.5, plus2: 10.2 },
  { month: 16, minus2: 6.4, normal: 8.6, plus2: 10.3 },
  { month: 17, minus2: 6.5, normal: 8.7, plus2: 10.4 },
  { month: 18, minus2: 6.5, normal: 8.8, plus2: 10.5 },
  { month: 19, minus2: 6.6, normal: 8.9, plus2: 10.6 },
  { month: 20, minus2: 6.7, normal: 9.0, plus2: 10.7 },
  { month: 21, minus2: 6.7, normal: 9.0, plus2: 10.7 },
  { month: 22, minus2: 6.8, normal: 9.1, plus2: 10.8 },
  { month: 23, minus2: 6.8, normal: 9.2, plus2: 10.9 },
  { month: 24, minus2: 6.9, normal: 9.3, plus2: 11.0 },
];

function getDiffInMonths(from: Date, to: Date): number {
  const years = to.getFullYear() - from.getFullYear();
  const months = to.getMonth() - from.getMonth();
  const days = to.getDate() - from.getDate();
  let total = years * 12 + months;
  if (days >= 0) total += 1;
  return total;
}

function getGenderLabel(gender: Gender | null): string {
  if (!gender) return "";
  return gender === "male" ? "Masculino" : "Feminino";
}

function formatDateToBR(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

export default function GraficoPeso() {
  const router = useRouter();
  const { id } = router.query;

  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [allPoints, setAllPoints] = useState<DataPoint[]>([]);
  const [babyData, setBabyData] = useState<{ month: number; weight: number; date: string }[]>([]);
  const [gender, setGender] = useState<Gender | null>(null);
  const [baby, setBaby] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchBabyData() {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) return;

        const [dataRes, babyRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/babies/${id}/data/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/babies/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!dataRes.ok || !babyRes.ok) {
          console.error("Erro ao buscar dados do bebê");
          return;
        }

        const data: RegistryItem[] = await dataRes.json();
        const babyInfo = await babyRes.json();

        setBaby(babyInfo);
        setBirthDate(new Date(babyInfo.birth_date));
        setGender(babyInfo.gender);

        const points = data
          .filter((entry) => entry.weight != null)
          .map((entry) => ({
            date: entry.date,
            weight: entry.weight!,
          }));

        setAllPoints(points);
      } catch (error) {
        console.error("Erro ao buscar dados do bebê:", error);
      }
    }

    fetchBabyData();
  }, [id]);

  useEffect(() => {
    if (!birthDate || allPoints.length === 0) {
      setBabyData([]);
      return;
    }

    const result = allPoints
      .map((p) => {
        const d = new Date(p.date);
        const month = getDiffInMonths(birthDate, d);
        return {
          month,
          weight: p.weight!,
          date: p.date,
        };
      })
      .filter((e) => e.month >= 1 && e.month <= 24)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setBabyData(result);
  }, [birthDate, allPoints]);

  const weightWHO = gender === "female" ? weightWHO_female : weightWHO_male;

  const chartData = weightWHO.map((item) => {
    const babyEntry = babyData.find((b) => b.month === item.month);
    return {
      month: item.month,
      minus2: item.minus2,
      normal: item.normal,
      plus2: item.plus2,
      babyWeight: babyEntry?.weight,
      babyDate: babyEntry?.date,
    };
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <TermsOfUseNotice />
      <Container>
        <div className="flex mt-1 justify-center md:justify-start">
          <button
            onClick={() => router.push(`/registry-table/${id}/data`)}
            className="self-start h-9 inline-flex items-center justify-center rounded-md border bg-background px-40 mt-5 mb-1 md:px-8 py-4 text-sm font-medium shadow-sm mb-10 cursor-pointer hover:text-blue-600 transition-colors duration-300"
          >
            <FiArrowLeft className="h-4 w-3 mr-2" />
            Voltar
          </button>
        </div>

        <h1 className="text-2xl font-bold my-3 text-center">
          Gráfico de Peso (1 a 24 meses)
        </h1>

        <div className="mt-4 mb-6 text-center">
          {baby ? (
            <>
              <h2 className="text-2xl font-semibold">{baby.name}</h2>
              <p className="text-gray-600">
                Gênero: <strong>{getGenderLabel(baby.gender)}</strong> | Nascido em:{" "}
                {formatDateToBR(baby.birth_date)}
              </p>
            </>
          ) : (
            <p>Carregando informações do bebê...</p>
          )}
        </div>

        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                label={{ value: "Meses de vida", position: "insideBottomRight", offset: -5 }}
                tickCount={24}
                domain={[1, 24]}
                type="number"
                tickFormatter={(tick) => `${tick}m`}
              />
              <YAxis label={{ value: "Peso (kg)", angle: -90, position: "insideLeft" }} />
              <Tooltip
                formatter={(value: any, name: any, props: any) => {
                  if (name === "Peso do bebê" && props.payload.babyDate) {
                    return [`${value} kg`, `Peso em ${new Date(props.payload.babyDate).toLocaleDateString("pt-BR")}`];
                  }
                  return [`${value} kg`, name];
                }}
                labelFormatter={(month: number) => `Mês ${month}`}
              />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="minus2" stroke="#8884d8" strokeDasharray="5 5" name="-2 DP" dot={false} />
              <Line type="monotone" dataKey="normal" stroke="#82ca9d" name="Mediana OMS" dot={false} />
              <Line type="monotone" dataKey="plus2" stroke="#ffc658" strokeDasharray="5 5" name="+2 DP" dot={false} />
              <Line
                type="monotone"
                dataKey="babyWeight"
                stroke="#ff4d4f"
                strokeWidth={3}
                name="Peso do bebê"
                dot={{ r: 4, stroke: '#ff4d4f', strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Container>
    </div>
  );
}

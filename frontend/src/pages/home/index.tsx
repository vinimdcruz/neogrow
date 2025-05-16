"use client";

import { Header } from "@/components/header/Header";
import { Container } from "@/components/container/Container";

export default function Home() {
  const itens = [
    { id: 1, titulo: "👶 Item 1", descricao: "Descrição do item 1" },
    { id: 2, titulo: "👶 Item 2", descricao: "Descrição do item 2" },
    { id: 3, titulo: "👶 Item 3", descricao: "Descrição do item 3" },
    { id: 4, titulo: "👶 Item 4", descricao: "Descrição do item 4" },
    { id: 5, titulo: "👶 Item 5", descricao: "Descrição do item 5" },
    { id: 6, titulo: "👶 Item 6", descricao: "Descrição do item 6" },
    { id: 7, titulo: "👶 Item 7", descricao: "Descrição do item 7" },
    { id: 8, titulo: "👶 Item 8", descricao: "Descrição do item 8" },
    { id: 9, titulo: "👶 Item 9", descricao: "Descrição do item 9" },
  ];

  return (
    <div className="h-screen bg-white overflow-hidden">
      <Header />
      <Container>
        <section className="h-full bg-white p-4 md:p-6 overflow-auto">
          {/* Cabeçalho */}
          <header className="mb-8 text-center">
            <h1 className="text-xl font-bold text-gray-600">
              Minha Lista de Itens
            </h1>
          </header>

          {/* Lista de itens */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {itens.slice(0, 9).map((item) => (
              <div
                key={item.id + item.titulo}
                className="overflow-hidden rounded-lg border border-blue-200 bg-white shadow-md transition-all hover:border-blue-400 hover:shadow-lg"
              >
                {/* Cabeçalho*/}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4">
                  <h2 className="text-base font-semibold text-white">
                    {item.titulo}
                  </h2>
                </div>

                {/* Conteúdo do card */}
                <div className="p-4">
                  <p className="text-gray-700 text-sm">{item.descricao}</p>
                  <button className="mt-4 rounded-md border bg-background px-2 py-2 text-xs font-medium shadow-sm cursor-pointer hover:text-blue-600 transition-colors duration-300">
                    Registrar Informações
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

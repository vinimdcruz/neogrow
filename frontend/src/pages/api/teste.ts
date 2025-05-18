// pages/api/teste.ts

import type { NextApiRequest, NextApiResponse } from "next";

// Dados simulados da lista
let babies = [
  {
    id: 1,
    nome: "Registro 1 👶",
    descricao: "Descrição 1",
    nascimento: "2024-04-21",
    peso: 3.2,
    estatura: 50,
    cabeça: 35,
  },
  {
    id: 2,
    nome: "Registro 2 👶",
    descricao: "Descrição 2",
    nascimento: "2024-04-21",
    peso: 3.5,
    estatura: 52,
    cabeça: 36,
  },
  {
    id: 3,
    nome: "Registro 3 👶",
    descricao: "Descrição 3",
    nascimento: "2024-04-21",
    peso: 3.5,
    estatura: 52,
    cabeça: 36,
  },
  {
    id: 4,
    nome: "Registro 4 👶",
    descricao: "Descrição 4",
    nascimento: "2024-04-21",
    peso: 3.5,
    estatura: 52,
    cabeça: 36,
  },
];

// Função que responde as requisições para /api/teste
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Retorna a lista
    res.status(200).json(babies);
  } else if (req.method === "POST") {
    // Se quiser adicionar um bebê via POST
    const novoBebe = req.body;

    novoBebe.id = babies.length + 1; // gera novo id
    babies.push(novoBebe);

    res.status(201).json(novoBebe);
  } else {
    // Método HTTP não permitido
    res.status(405).send("Método não permitido");
  }
}

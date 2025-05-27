// pages/api/teste.ts

import type { NextApiRequest, NextApiResponse } from "next";

// Dados simulados da lista
let babies = [
  {/*
    id: 1,
    name: "Registro 1 👶",
    date: "2024-04-21",
    weight: 3.2,
    height: 50,
    head_circumference: 35,
  },
  {
    id: 2,
    name: "Registro 2 👶",
    date: "2024-04-21",
    weight: 3.2,
    height: 50,
    head_circumference: 35,
  },
  {
    id: 3,
    name: "Registro 3 👶",
    date: "2024-04-21",
    weight: 3.2,
    height: 50,
    head_circumference: 35,
  */}
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
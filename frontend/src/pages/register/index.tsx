'use client';

import { useState } from "react";
import Image from 'next/image';
import minhaImagem from '@/assets/logo.jpg';
import Link from "next/link";
import { Container } from "@/components/container/Container";
import { Input } from "@/components/input/Input";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser, FaLock } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import { DevelopmentBadge } from "@/components/developmentbadge/DevelopmentBadge";

// Validação com Zod
const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório."),
  email: z.string().email("Insira um e-mail válido").nonempty("O campo e-mail é obrigatório."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  confirmPassword: z.string().nonempty("Confirme sua senha."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem.",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(data: FormData) {
    const { name, email, password } = data;
    console.log("Dados do formulário:", data);
    try {
      setLoading(true);

      const response = await fetch("/api/auth/register/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          username: email, 
          email,
          password
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Erro da API:", error);
        toast.error(error.message || "Erro ao cadastrar usuário. Tente novamente com um e-mail diferente.");
        setLoading(false);
        return;
      }

      const resultado = await response.json();
      console.log("Usuário cadastrado:", resultado);
      toast.success("Usuário cadastrado com sucesso!");
      router.push("/login");

    } catch (err) {
      console.error("Erro na requisição:", err);
      toast.error("Erro de rede ao conectar com a API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <DevelopmentBadge />
      <Toaster position="top-right" />

      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-1">
        <Link href="/">
          <Image
            src={minhaImagem}
            alt="Logo do Site"
            className="h-10 w-60"
          />
        </Link>

        <form
          className="bg-white max-w-xl w-full rounded-lg p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <div className="pl-1 pb-1 text-[17px] flex justify-between items-center">
              Nome
              <FaUser size={18} color="gray" />
            </div>
            <Input
              type="text"
              placeholder="Digite seu nome completo"
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <div className="pl-1 pb-1 text-[17px] flex justify-between items-center">
              Email
              <FiMail size={18} color="gray" />
            </div>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <div className="pl-1 pb-1 text-[17px] flex justify-between items-center">
              Senha
              <FaLock size={18} color="gray" />
            </div>
            <Input
              type="password"
              placeholder="Digite sua senha"
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <div className="pl-1 pb-1 text-[17px] flex justify-between items-center">
              Confirmar senha
              <FaLock size={18} color="gray" />
            </div>
            <Input
              type="password"
              placeholder="Confirme sua senha"
              name="confirmPassword"
              error={errors.confirmPassword?.message}
              register={register}
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-blue-600 rounded-md text-white hover:bg-blue-700 mb-2 mt-2 cursor-pointer disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <Link href="/login" className="cursor-pointer hover:text-blue-600 transition-colors duration-300">
          Já tem uma conta? Faça login
        </Link>
      </div>
    </Container>
  );
}

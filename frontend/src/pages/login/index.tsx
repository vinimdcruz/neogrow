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
import { FiMail } from 'react-icons/fi';
import { FaLock } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { useAuth } from '../../context/authContext';

// Validação do formulário com Zod
const schema = z.object({
  email: z.string().nonempty("O campo de e-mail é obrigatório"),
  password: z.string().nonempty("O campo senha é obrigatório."),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  async function onSubmit(data: FormData) {
    try {
      setLoading(true);

      const formBody = new URLSearchParams();
      formBody.append("grant_type", "password");
      formBody.append("scope", "value");
      formBody.append("client_id", "string");
      formBody.append("client_secret", "string");
      formBody.append("username", data.email);
      formBody.append("password", data.password);

      const response = await fetch("http://44.203.139.11/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-api-key": "SUA_CHAVE_AQUI",
        },
        body: formBody.toString(),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Erro ao fazer login:", error);
        alert(error.message || "Usuário ou senha inválidos.");
        return;
      }

      const result = await response.json();
      console.log("Login realizado:", result);

      if (result.access_token) {
        const user = {
          uid: "api-user",
          name: "Usuário",
          email: data.email
        };

        login(result.access_token, user, () => {
          alert("Login realizado com sucesso!");
          router.push("/dashboard");
        });
      } else {
        alert("Erro: resposta inválida da API.");
      }

    } catch (err) {
      console.error("Erro na requisição:", err);
      alert("Erro ao conectar com a API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
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
          <div className="mb-1">
            <div className="pl-1 pb-1 text-[17px] flex justify-between items-center">
              Email
              <FiMail size={18} color="gray" />
            </div>
            <Input
              type="text"
              placeholder="Digite seu email"
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

          <button
            type="submit"
            className="w-full h-10 bg-blue-600 rounded-md text-white hover:bg-blue-700 mb-2 mt-1 cursor-pointer disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Acessar"}
          </button>
        </form>

        <Link href="/register" className="cursor-pointer hover:text-blue-600 transition-colors duration-300">
          Não tem uma conta? Cadastre-se
        </Link>
      </div>
    </Container>
  );
}

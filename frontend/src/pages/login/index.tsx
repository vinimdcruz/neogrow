"use client";

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
import toast, { Toaster } from 'react-hot-toast';
import { DevelopmentBadge } from "@/components/developmentbadge/DevelopmentBadge";

// Validação do formulário com Zod
const schema = z.object({
  email: z.string().nonempty("O campo de e-mail é obrigatório"),
  password: z.string().nonempty("O campo senha é obrigatório."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Você deve aceitar os termos para continuar." })
  }),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
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

      const response = await fetch("/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Erro ao fazer login:", error);
        toast.error(error.message || "Usuário ou senha inválidos.");
        reset({ email: '', password: '', consent: undefined });
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
          toast.success("Login realizado com sucesso!");
          router.push("/dashboard");
        });
      } else {
        toast.error("Erro: resposta inválida da API.");
      }

    } catch (err) {
      console.error("Erro na requisição:", err);
      toast.error("Erro ao conectar com a API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Toaster position="top-right" />
      <DevelopmentBadge />

      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-1 mt-5 md:mt-2">
        <Link href="/">
          <Image
            src={minhaImagem}
            alt="Logo do Site"
            className="h-10 w-60"
          />
        </Link>

        <form
          className="bg-white max-w-xl w-full rounded-lg p-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
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

          <div className="mb-4">
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

          {/* Consentimento*/}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 shadow-sm">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                {...register("consent")}
                className="mt-1 accent-blue-600"
              />
              <label htmlFor="consent" className="text-sm text-gray-800">
                Eu concordo com{" "}
                <Link
                  href="/privacyandterms"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Termos de Uso e Política de Privacidade
                </Link>
              </label>
            </div>
            {errors.consent && (
              <p className="text-red-500 text-sm mt-2">{errors.consent.message}</p>
            )}
          </div>

          {/* Aviso legal */}
          <div className="bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-sm px-5 py-6 mt-4 max-w-xl shadow-inner leading-relaxed">
            <h3 className="font-semibold text-gray-800 mb-3 text-base text-center">
              📌 Aviso Legal e Responsabilidade
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-justify">
              <li>
                Esta aplicação é de código aberto e foi desenvolvida exclusivamente para fins educacionais, sem fins lucrativos, e sem qualquer objetivo de comercialização ou compartilhamento de dados.
              </li>
              <li>
                O uso da aplicação é voluntário, e os dados inseridos são de responsabilidade exclusiva do usuário. Recomendamos que não sejam fornecidos dados sensíveis ou pessoais, como documentos ou nome completo; utilize apenas apelidos.
              </li>
              <li>
                Nenhuma informação pessoal ou sensível será armazenada ou utilizada sem o consentimento claro e informado do usuário, conforme previsto na Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
              </li>
              <li>
                Os desenvolvedores não assumem responsabilidade por qualquer uso indevido, malicioso ou não autorizado das informações inseridas na aplicação, nem por integrações externas realizadas por terceiros.
              </li>
              <li>
                <b>Esta aplicação não realiza diagnósticos médicos nem substitui acompanhamento profissional. Consulte um profissional médico de saúde em caso de dúvidas sobre o desenvolvimento da criança.</b>
              </li>
              <li>
                Ao efetuar login e utilizar o aplicativo, o usuário declara estar ciente e de acordo com os  
                <Link
                 href="/privacyandterms"
                 target="_blank"
                 rel="noreferrer"
                 className="text-blue-600 font-medium hover:underline"
                >
                  Termos de Uso e Política de Privacidade
                </Link>.
              </li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-blue-600 rounded-md text-white hover:bg-blue-700 mb-1 mt-4 cursor-pointer disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Acessar"}
          </button>
        </form>

        <Link
          href="/register"
          className="cursor-pointer text-sm text-blue-600 hover:underline transition-colors duration-300 mb-8 md:mb-0"
        >
          Não tem uma conta? Cadastre-se
        </Link>
      </div>
    </Container>
  );
}

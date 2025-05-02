import { FormEvent, useState } from "react"

import Image from 'next/image';
import minhaImagem from '@/assets/logo.jpg'
import Link from "next/link"
import { Container } from "@/components/container/Container"

import { Input } from "@/components/input/Input"
import { useForm } from "react-hook-form"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { FiMail } from 'react-icons/fi';
import { FaLock } from 'react-icons/fa';

const schema = z.object({
  email: z.string().email("Insira um e-mail válido").nonempty("O campo e-mail é obrigatório"),
  password: z.string().nonempty("O campo senha é obrigatório.")
})

type FormData = z.infer<typeof schema>


export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
      resolver: zodResolver(schema),
      mode: "onChange"
    })

    function onSubmit(data: FormData){
      console.log(data);
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

              <button type="submit" className="w-full h-10 bg-blue-600 rounded-md text-white hover:bg-blue-700 mb-2 mt-1 cursor-pointer">
                Acessar  
              </button>    
            </form>

            <Link href="/register" className="cursor-pointer hover:text-blue-600 transition-colors duration-300">
              Não tem uma conta? Cadastre-se
            </Link>

          </div>
    </Container>
  )
}














